import { Candidate } from '../Data';
import { IssueScore } from '../Scoring';

export const generateScore = (issueId: number, candidates: Candidate[], scores: number[]): IssueScore => {
    const candidateScores = [];

    // eslint-disable-next-line id-length
    for (let i = 0; i < candidates.length; i++) {
        candidateScores.push({
            candidateId: candidates[i].candidateId,
            score: scores[i]
        });
    }
    return {
        issueId,
        candidates: candidateScores
    };
};
