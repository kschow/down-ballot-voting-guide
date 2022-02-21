import { shuffle } from 'lodash-es';
import { getPositionsForIssue, getRandomIssueOrder } from './GuideUtils';
import { Candidate, IssuePositions, Race } from '@dbvg/shared-types';
import { IssueScore, Result } from './Scoring';

class Guide {
    race: Race;
    issuePositions: IssuePositions[];
    currentIssue: number;
    score: IssueScore[];

    constructor(race: Race, issueOrder: number[] = null) {
        this.race = race;

        const order = issueOrder || getRandomIssueOrder(race.issues);
        this.issuePositions = order.map((issueId) => {
            const positionsForIssue = getPositionsForIssue(race, issueId);
            positionsForIssue.positions = shuffle(positionsForIssue.positions);
            return positionsForIssue;
        });

        this.currentIssue = 0;

        this.score = order.map((issueId) => {
            const issueScores: IssueScore = { issueId, candidates: [] };
            issueScores.candidates = race.candidates.map((candidate) => {
                return {
                    candidateId: candidate.candidateId,
                    score: 0
                };
            });
            return issueScores;
        });
    }

    hasOneCandidate(): boolean {
        return this.race.candidates.length === 1;
    }

    hasFewerThanTwoAnswered(): boolean {
        const candidateAnswered = this.race.candidates.map((candidate) => {
            let didCandidateAnswer = 0;
            candidate.positions.forEach((pos) => {
                if (pos.position) {
                    didCandidateAnswer = 1;
                }
            });
            return didCandidateAnswer;
        });

        const numberOfCandidatesAnswered =
            candidateAnswered.reduce((sum, didAnswer) => sum + didAnswer, 0);

        return numberOfCandidatesAnswered < 2;
    }

    getCandidates(): Candidate[] {
        return this.race.candidates;
    }

    getNextIssuePositions(): IssuePositions {
        if (this.currentIssue < this.issuePositions.length) {
            return this.issuePositions[this.currentIssue++];
        }
        return null;
    }

    onLastIssue(): boolean {
        return this.currentIssue === this.issuePositions.length;
    }

    updateScore(scoreUpdate: IssueScore): void {
        const updateIndex = this.score.findIndex((issueScore) => issueScore.issueId === scoreUpdate.issueId);
        if (updateIndex === -1) {
            throw new Error(`Issue: ${scoreUpdate.issueId} could not be found to score`);
        }
        this.score[updateIndex] = scoreUpdate;
    }

    tallyResults(): Result[] {
        const results = this.race.candidates.map((candidate) => {

            const candidateIssueResults = this.race.issues.map((issue) => {
                const issueScore = this.score.find((iScore) => iScore.issueId === issue.issueId);
                const candidateScore =
                    issueScore.candidates.find((cScore) => cScore.candidateId === candidate.candidateId);

                const position = candidate.positions.find((pos) => pos.issueId === issue.issueId);

                return {
                    issueName: issue.issueName,
                    position: position.position,
                    score: candidateScore.score
                };
            });

            const totalScore = candidateIssueResults
                .reduce((accumulator, current) => accumulator + current.score, 0);

            return {
                candidateId: candidate.candidateId,
                candidateName: candidate.candidateName,
                total: totalScore,
                issues: candidateIssueResults
            };
        });

        // sort by descending total (ties will be handled on front end later)
        results.sort((result1, result2) => result2.total - result1.total);
        return results;
    }
}

export default Guide;
