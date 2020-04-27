import { shuffle } from 'lodash/collection';
import { getPositionsForIssue, getRandomIssueOrder } from './utils';

class Guide {
    constructor(race, issueOrder = null, issuePositions = null) {
        this.race = race;

        const order = issueOrder || getRandomIssueOrder(race.issues);
        this.issuePositions = issueOrder && issuePositions ?
            issuePositions :
            order.map((issueId) => {
                const positionsForIssue = getPositionsForIssue(race, issueId);
                positionsForIssue.positions = shuffle(positionsForIssue.positions);
                return positionsForIssue;
            });

        this.currentIssue = 0;
    }

    getNextIssuePositions() {
        if (this.currentIssue < this.issuePositions.size) {
            return this.issuePositions[this.currentIssue++];
        }
        return null;
    }
}

export default Guide;
