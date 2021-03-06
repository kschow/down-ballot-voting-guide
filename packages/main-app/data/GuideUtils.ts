import { shuffle } from 'lodash/collection';
import { Issue, IssuePositions, Race } from '@dbvg/shared-types';

const getRandomIssueOrder = (issues: Issue[]): number[] => {
    return shuffle(issues.map((issue) => issue.issueId));
};

const getPositionsForIssue = (race: Race, issueId: number): IssuePositions => {
    const { issues, candidates } = race;

    const issue = issues.find((iss) => iss.issueId === issueId);

    // eslint-disable-next-line no-undefined
    if (issue === undefined) {
        throw new Error(`Issue ${issueId} not found for race`);
    }

    const positions = candidates.map((candidate) => {
        const position = candidate.positions.find((pos) => pos.issueId === issueId);

        // eslint-disable-next-line no-undefined
        if (position === undefined) {
            throw new Error(`Position not found for issue ${issueId} for candidate ${candidate.candidateId} `);
        }

        return {
            candidateId: candidate.candidateId,
            position: position.position
        };
    });

    return {
        issueId: issue.issueId,
        issueName: issue.issueName,
        question: issue.question,
        positions
    };
};

export { getRandomIssueOrder, getPositionsForIssue };
