import { generateIssues, generateCandidate } from '@dbvg/shared-types';
import { generateScore } from './testscoring';

it('generateScore generates expected score', () => {
    const expectedScore = {
        issueId: 2,
        candidates: [
            {
                candidateId: 3,
                score: 2
            },
            {
                candidateId: 6,
                score: 1
            },
            {
                candidateId: 1,
                score: 8
            }
        ]
    };

    const issues = generateIssues(3);
    const candidateOne = generateCandidate(1, issues, 'democrat');
    const candidateThree = generateCandidate(3, issues, 'republican');
    const candidateSix = generateCandidate(6, issues, 'democrat');

    const generatedScore = generateScore(2, [candidateThree, candidateSix, candidateOne], [2, 1, 8]);
    expect(generatedScore).toStrictEqual(expectedScore);
});
