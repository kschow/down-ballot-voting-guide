import { shuffle } from 'lodash/collection';
import { getPositionsForIssue, getRandomIssueOrder } from './utils';

class Guide {
    constructor(race, issueOrder = null, shufflePositions = true) {
        this.race = race;

        const order = issueOrder || getRandomIssueOrder(race.issues);
        this.issuePositions = order.map((issueId) => {
            const positionsForIssue = getPositionsForIssue(race, issueId);
            if (shufflePositions) {
                positionsForIssue.positions = shuffle(positionsForIssue.positions);
            }
            return positionsForIssue;
        });

        this.currentIssue = 0;

        this.score = race.issues.map((issue) => {
            const issueScores = { issueId: issue.issueId };
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
        if (this.currentIssue < this.issuePositions.size) {
            return this.issuePositions[this.currentIssue++];
        }
        return null;
    }

    updateScore(scoreUpdate) {
        const updateIndex = this.score.findIndex((issueScore) => issueScore.issueId === scoreUpdate.issueId);
        if (updateIndex === -1) {
            throw new Error(`Issue: ${scoreUpdate.issueId} could not be found to score`);
        }
        this.score[updateIndex] = scoreUpdate;
    }
}

export default Guide;
