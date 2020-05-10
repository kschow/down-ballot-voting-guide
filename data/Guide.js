import { shuffle } from 'lodash/collection';
import { getPositionsForIssue, getRandomIssueOrder } from './utils';

class Guide {
    constructor(race, issueOrder = null) {
        this.race = race;

        const order = issueOrder || getRandomIssueOrder(race.issues);
        this.issuePositions = order.map((issueId) => {
            const positionsForIssue = getPositionsForIssue(race, issueId);
            positionsForIssue.positions = shuffle(positionsForIssue.positions);
            return positionsForIssue;
        });

        this.currentIssue = 0;

        this.score = order.map((issueId) => {
            const issueScores = { issueId };
            issueScores.candidates = race.candidates.map((candidate) => {
                return {
                    candidateId: candidate.candidateId,
                    score: 0
                };
            });
            return issueScores;
        });
    }

    getNextIssuePositions() {
        if (this.currentIssue < this.issuePositions.length) {
            return this.issuePositions[this.currentIssue++];
        }
        return null;
    }

    onLastIssue() {
        return this.currentIssue === this.issuePositions.length;
    }

    updateScore(scoreUpdate) {
        const updateIndex = this.score.findIndex((issueScore) => issueScore.issueId === scoreUpdate.issueId);
        if (updateIndex === -1) {
            throw new Error(`Issue: ${scoreUpdate.issueId} could not be found to score`);
        }
        this.score[updateIndex] = scoreUpdate;
    }

    tallyResults() {
        const results = this.race.candidates.map((candidate) => {
            const candidateIssueResults = this.race.issues.map((issue) => {
                const issueScoreIndex = this.score.findIndex((issueScore) => issueScore.issueId === issue.issueId);
                const candidateScoreIndex =
                    this.score[issueScoreIndex].candidates
                        .findIndex((candidateScore) => candidateScore.candidateId === candidate.candidateId);
                return {
                    issueName: issue.issueName,
                    score: this.score[issueScoreIndex].candidates[candidateScoreIndex].score
                };
            });

            const totalScore = candidateIssueResults.reduce((accumulator, current) => accumulator + current.score, 0);

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
