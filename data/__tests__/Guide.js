import {
    generateCandidate,
    generateIssues,
    generateNullCandidate,
    generateRace
} from '../__testdata__/testdata';
import Guide from '../Guide';

describe('Guide scoring', () => {
    it('initializes scores to proper values for all issues/candidates', () => {
        const expectedInitialScore = [
            {
                issueId: 0,
                candidates: [
                    {
                        candidateId: 1,
                        score: 0
                    },
                    {
                        candidateId: 2,
                        score: 0
                    },
                    {
                        candidateId: 3,
                        score: 0
                    },
                    {
                        candidateId: 4,
                        score: 0
                    },
                    {
                        candidateId: 5,
                        score: 0
                    }
                ]
            },
            {
                issueId: 1,
                candidates: [
                    {
                        candidateId: 1,
                        score: 0
                    },
                    {
                        candidateId: 2,
                        score: 0
                    },
                    {
                        candidateId: 3,
                        score: 0
                    },
                    {
                        candidateId: 4,
                        score: 0
                    },
                    {
                        candidateId: 5,
                        score: 0
                    }
                ]
            },
            {
                issueId: 2,
                candidates: [
                    {
                        candidateId: 1,
                        score: 0
                    },
                    {
                        candidateId: 2,
                        score: 0
                    },
                    {
                        candidateId: 3,
                        score: 0
                    },
                    {
                        candidateId: 4,
                        score: 0
                    },
                    {
                        candidateId: 5,
                        score: 0
                    }
                ]
            }
        ];

        const issues = generateIssues(3);
        const candidate1 = generateCandidate(1, 'democrat', issues);
        const candidate2 = generateCandidate(2, 'democrat', issues);
        const candidate3 = generateCandidate(3, 'democrat', issues);
        const candidate4 = generateNullCandidate(4, 'democrat', issues);
        const candidate5 = generateCandidate(5, 'democrat', issues);

        const candidates = [
            candidate1,
            candidate2,
            candidate3,
            candidate4,
            candidate5
        ];

        const race = generateRace(25, issues, candidates);
        const issueOrder = [0, 1, 2];
        const guide = new Guide(race, issueOrder, false);

        expect(guide.score).toStrictEqual(expectedInitialScore);
    });

    it('updateScore adds scores to the right issues and candidates', () => {
        const expectedUpdatedScore = [
            {
                issueId: 0,
                candidates: [
                    {
                        candidateId: 1,
                        score: 0
                    },
                    {
                        candidateId: 2,
                        score: 0
                    },
                    {
                        candidateId: 3,
                        score: 0
                    },
                    {
                        candidateId: 4,
                        score: 0
                    }
                ]
            },
            {
                issueId: 1,
                candidates: [
                    {
                        candidateId: 1,
                        score: 0
                    },
                    {
                        candidateId: 2,
                        score: 0
                    },
                    {
                        candidateId: 3,
                        score: 0
                    },
                    {
                        candidateId: 4,
                        score: 0
                    }
                ]
            },
            {
                issueId: 2,
                candidates: [
                    {
                        candidateId: 1,
                        score: 0
                    },
                    {
                        candidateId: 2,
                        score: 0
                    },
                    {
                        candidateId: 3,
                        score: 0
                    },
                    {
                        candidateId: 4,
                        score: 0
                    }
                ]
            },
            {
                issueId: 3,
                candidates: [
                    {
                        candidateId: 1,
                        score: 3
                    },
                    {
                        candidateId: 2,
                        score: 7
                    },
                    {
                        candidateId: 3,
                        score: 0
                    },
                    {
                        candidateId: 4,
                        score: 2
                    }
                ]
            },
            {
                issueId: 4,
                candidates: [
                    {
                        candidateId: 1,
                        score: 0
                    },
                    {
                        candidateId: 2,
                        score: 0
                    },
                    {
                        candidateId: 3,
                        score: 0
                    },
                    {
                        candidateId: 4,
                        score: 0
                    }
                ]
            }
        ];
        const issues = generateIssues(5);
        const candidate1 = generateCandidate(1, 'democrat', issues);
        const candidate2 = generateCandidate(2, 'democrat', issues);
        const candidate3 = generateCandidate(3, 'democrat', issues);
        const candidate4 = generateNullCandidate(4, 'democrat', issues);

        const candidates = [
            candidate1,
            candidate2,
            candidate3,
            candidate4
        ];

        const race = generateRace(35, issues, candidates);
        const issueOrder = [0, 1, 2, 3, 4];
        const guide = new Guide(race, issueOrder, false);

        const scoreUpdate = {
            issueId: 3,
            candidates: [
                {
                    candidateId: 1,
                    score: 3
                },
                {
                    candidateId: 2,
                    score: 7
                },
                {
                    candidateId: 3,
                    score: 0
                },
                {
                    candidateId: 4,
                    score: 2
                }
            ]
        };

        guide.updateScore(scoreUpdate);

        expect(guide.score).toStrictEqual(expectedUpdatedScore);
    });
});
