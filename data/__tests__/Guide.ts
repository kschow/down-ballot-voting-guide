import {
    generateCandidate,
    generateIssues,
    generateNullCandidate,
    generateRace
} from '../__testdata__/testdata';
import { generateScore } from '../__testdata__/testscoring';
import Guide from '../Guide';

describe('Guide scoring', () => {
    it('initializes scores to proper values for all issues/candidates', () => {
        const expectedInitialScore = [
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
            },
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
        const issueOrder = [2, 0, 1];
        const guide = new Guide(race, issueOrder);

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
        const issueOrder = [0, 1, 2, 4, 3];
        const guide = new Guide(race, issueOrder);

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

    it('tallies up score by candidate and sorts candidates by total score', () => {
        const expectedResults = [
            {
                candidateId: 2,
                candidateName: 'candidate 2',
                total: 10,
                issues: [
                    {
                        issueName: 'issue 0',
                        position: 'c2-i0',
                        score: 1
                    },
                    {
                        issueName: 'issue 1',
                        position: 'c2-i1',
                        score: 2
                    },
                    {
                        issueName: 'issue 2',
                        position: 'c2-i2',
                        score: 7
                    }
                ]
            },
            {
                candidateId: 1,
                candidateName: 'candidate 1',
                total: 6,
                issues: [
                    {
                        issueName: 'issue 0',
                        position: 'c1-i0',
                        score: 4
                    },
                    {
                        issueName: 'issue 1',
                        position: 'c1-i1',
                        score: 1
                    },
                    {
                        issueName: 'issue 2',
                        position: 'c1-i2',
                        score: 1
                    }
                ]
            },
            {
                candidateId: 3,
                candidateName: 'candidate 3',
                total: 0,
                issues: [
                    {
                        issueName: 'issue 0',
                        position: null,
                        score: 0
                    },
                    {
                        issueName: 'issue 1',
                        position: null,
                        score: 0
                    },
                    {
                        issueName: 'issue 2',
                        position: null,
                        score: 0
                    }
                ]
            }
        ];

        const issues = generateIssues(3);
        const candidate1 = generateCandidate(1, 'republican', issues);
        const candidate2 = generateCandidate(2, 'republican', issues);
        const candidate3 = generateNullCandidate(3, 'republican', issues);

        const candidates = [candidate1, candidate2, candidate3];

        const race = generateRace(20, issues, candidates);
        const issueOrder = [0, 1, 2];
        const guide = new Guide(race, issueOrder);

        const update1 = generateScore(0, candidates, [4, 1, 0]);
        const update2 = generateScore(1, candidates, [1, 2, 0]);
        const update3 = generateScore(2, candidates, [1, 7, 0]);
        guide.updateScore(update1);
        guide.updateScore(update2);
        guide.updateScore(update3);

        expect(guide.tallyResults()).toStrictEqual(expectedResults);
    });
});
