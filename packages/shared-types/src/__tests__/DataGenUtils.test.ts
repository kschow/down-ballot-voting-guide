import {
    generateBallot,
    generateCandidate,
    generateElection,
    generateIssues,
    generateNullCandidate,
    generateRace
} from '../DataGenUtils';

it('generateIssues generates expected issues', () => {
    const expectedIssues = [
        {
            issueId: 0,
            issueName: 'Issue #0',
            question: 'Issue question #0'
        },
        {
            issueId: 1,
            issueName: 'Issue #1',
            question: 'Issue question #1'
        },
        {
            issueId: 2,
            issueName: 'Issue #2',
            question: 'Issue question #2'
        }
    ];

    const generatedIssues = generateIssues(3);
    expect(generatedIssues).toStrictEqual(expectedIssues);
});

it('generateCandidate generates the expected candidate', () => {
    const expectedCandidate = {
        candidateId: 10,
        candidateName: 'Candidate #10',
        party: 'republican',
        positions: [
            {
                issueId: 0,
                position: 'c10-i0'
            },
            {
                issueId: 1,
                position: 'c10-i1'
            }
        ],
        education: 'Some School',
        campaignWebsite: 'http://google.com',
        facebook: 'https://facebook.com',
        twitter: 'http://twitter.com',
        video: 'https://youtube.com'
    };

    const issues = generateIssues(2);

    const generatedCandidate = generateCandidate(10, issues, 'republican');
    expect(generatedCandidate).toStrictEqual(expectedCandidate);
});

it('generateNullCandidate generates the expected null candidate', () => {
    const expectedCandidate = {
        candidateId: 8,
        candidateName: 'Candidate #8',
        party: 'democrat',
        positions: [
            {
                issueId: 0,
                position: null
            },
            {
                issueId: 1,
                position: null
            },
            {
                issueId: 2,
                position: null
            }
        ],
        education: null,
        campaignWebsite: null,
        facebook: null,
        twitter: null,
        video: null
    };

    const issues = generateIssues(3);

    const generatedCandidate = generateNullCandidate(8, issues, 'democrat');
    expect(generatedCandidate).toStrictEqual(expectedCandidate);
});

it('generateRace generates the expected race', () => {
    const expectedRace = {
        raceId: 5,
        raceName: 'Race #5',
        description: 'Race description #5',
        county: 'ALL',
        precincts: ['ALL'],
        issues: [
            {
                issueId: 0,
                issueName: 'Issue #0',
                question: 'Issue question #0'
            },
            {
                issueId: 1,
                issueName: 'Issue #1',
                question: 'Issue question #1'
            }
        ],
        candidates: [
            {
                candidateId: 1,
                candidateName: 'Candidate #1',
                party: 'democrat',
                positions: [
                    {
                        issueId: 0,
                        position: 'c1-i0'
                    },
                    {
                        issueId: 1,
                        position: 'c1-i1'
                    }
                ],
                education: 'Some School',
                campaignWebsite: 'http://google.com',
                facebook: 'https://facebook.com',
                twitter: 'http://twitter.com',
                video: 'https://youtube.com'
            },
            {
                candidateId: 2,
                candidateName: 'Candidate #2',
                party: null,
                positions: [
                    {
                        issueId: 0,
                        position: null
                    },
                    {
                        issueId: 1,
                        position: null
                    }
                ],
                education: null,
                campaignWebsite: null,
                facebook: null,
                twitter: null,
                video: null
            }
        ]
    };

    const issues = generateIssues(2);
    const candidateOne = generateCandidate(1, issues, 'democrat');
    const candidateTwo = generateNullCandidate(2, issues);
    const candidates = [candidateOne, candidateTwo];

    const generatedRace = generateRace(5, issues, candidates);
    expect(generatedRace).toStrictEqual(expectedRace);
});

it('generateBallots generates the expected ballot', () => {
    const expectedBallot = {
        ballotId: 1,
        ballotName: '2020 GOP Primary',
        races: [
            {
                raceId: 1,
                raceName: 'Race #1',
                description: 'Race description #1',
                county: 'ALL',
                precincts: ['ALL'],
                issues: [
                    {
                        issueId: 0,
                        issueName: 'Issue #0',
                        question: 'Issue question #0'
                    },
                    {
                        issueId: 1,
                        issueName: 'Issue #1',
                        question: 'Issue question #1'
                    }
                ],
                candidates: [
                    {
                        candidateId: 2,
                        candidateName: 'Candidate #2',
                        party: 'republican',
                        positions: [
                            {
                                issueId: 0,
                                position: null
                            },
                            {
                                issueId: 1,
                                position: null
                            }
                        ],
                        education: null,
                        campaignWebsite: null,
                        facebook: null,
                        twitter: null,
                        video: null
                    }
                ]
            },
            {
                raceId: 2,
                raceName: 'Race #2',
                description: 'Race description #2',
                county: 'ALL',
                precincts: ['ALL'],
                issues: [
                    {
                        issueId: 0,
                        issueName: 'Issue #0',
                        question: 'Issue question #0'
                    },
                    {
                        issueId: 1,
                        issueName: 'Issue #1',
                        question: 'Issue question #1'
                    }
                ],
                candidates: [
                    {
                        candidateId: 1,
                        candidateName: 'Candidate #1',
                        party: 'republican',
                        positions: [
                            {
                                issueId: 0,
                                position: null
                            },
                            {
                                issueId: 1,
                                position: null
                            }
                        ],
                        education: null,
                        campaignWebsite: null,
                        facebook: null,
                        twitter: null,
                        video: null
                    }
                ]
            },
            {
                raceId: 3,
                raceName: 'Race #3',
                description: 'Race description #3',
                county: 'ALL',
                precincts: ['ALL'],
                issues: [
                    {
                        issueId: 0,
                        issueName: 'Issue #0',
                        question: 'Issue question #0'
                    },
                    {
                        issueId: 2,
                        issueName: 'Issue #2',
                        question: 'Issue question #2'
                    }
                ],
                candidates: [
                    {
                        candidateId: 3,
                        candidateName: 'Candidate #3',
                        party: 'republican',
                        positions: [
                            {
                                issueId: 0,
                                position: null
                            },
                            {
                                issueId: 2,
                                position: null
                            }
                        ],
                        education: null,
                        campaignWebsite: null,
                        facebook: null,
                        twitter: null,
                        video: null
                    },
                    {
                        candidateId: 4,
                        candidateName: 'Candidate #4',
                        party: 'republican',
                        positions: [
                            {
                                issueId: 0,
                                position: null
                            },
                            {
                                issueId: 2,
                                position: null
                            }
                        ],
                        education: null,
                        campaignWebsite: null,
                        facebook: null,
                        twitter: null,
                        video: null
                    }
                ]
            }
        ]
    };

    const allIssues = generateIssues(3);
    const race1and2Issues = [...allIssues].slice(0, 2);
    const race3Issues = [...allIssues];
    race3Issues.splice(1, 1);

    const candidate1 = generateNullCandidate(1, race1and2Issues, 'republican');
    const candidate2 = generateNullCandidate(2, race1and2Issues, 'republican');
    const candidate3 = generateNullCandidate(3, race3Issues, 'republican');
    const candidate4 = generateNullCandidate(4, race3Issues, 'republican');

    const race1 = generateRace(1, race1and2Issues, [candidate2]);
    const race2 = generateRace(2, race1and2Issues, [candidate1]);
    const race3 = generateRace(3, race3Issues, [candidate3, candidate4]);

    const generatedElection = generateBallot(1, [race1, race2, race3], '2020 GOP Primary');

    expect(generatedElection).toStrictEqual(expectedBallot);
});

it('generateElection generates the correct election off ballots', () => {
    const expectedElection = {
        electionName: '2022 Primary Election',
        ballots: [
            {
                ballotId: 1,
                ballotName: 'Ballot #1',
                races: [
                    {
                        raceId: 1,
                        raceName: 'Race #1',
                        description: 'Race description #1',
                        county: 'ALL',
                        precincts: ['ALL'],
                        issues: [
                            {
                                issueId: 0,
                                issueName: 'Issue #0',
                                question: 'Issue question #0'
                            },
                            {
                                issueId: 1,
                                issueName: 'Issue #1',
                                question: 'Issue question #1'
                            }
                        ],
                        candidates: [
                            {
                                candidateId: 1,
                                candidateName: 'Candidate #1',
                                party: 'republican',
                                positions: [
                                    {
                                        issueId: 0,
                                        position: null
                                    },
                                    {
                                        issueId: 1,
                                        position: null
                                    }
                                ],
                                education: null,
                                campaignWebsite: null,
                                facebook: null,
                                twitter: null,
                                video: null
                            }
                        ]
                    }
                ]
            },
            {
                ballotId: 2,
                ballotName: 'Ballot #2',
                races: [
                    {
                        raceId: 2,
                        raceName: 'Race #2',
                        description: 'Race description #2',
                        county: 'ALL',
                        precincts: ['ALL'],
                        issues: [
                            {
                                issueId: 0,
                                issueName: 'Issue #0',
                                question: 'Issue question #0'
                            },
                            {
                                issueId: 1,
                                issueName: 'Issue #1',
                                question: 'Issue question #1'
                            }
                        ],
                        candidates: [
                            {
                                candidateId: 2,
                                candidateName: 'Candidate #2',
                                party: 'democrat',
                                positions: [
                                    {
                                        issueId: 0,
                                        position: null
                                    },
                                    {
                                        issueId: 1,
                                        position: null
                                    }
                                ],
                                education: null,
                                campaignWebsite: null,
                                facebook: null,
                                twitter: null,
                                video: null
                            }
                        ]
                    }
                ]
            }
        ]
    };

    const issues = generateIssues(2);
    const gopCandidate = generateNullCandidate(1, issues, 'republican');
    const demCandidate = generateNullCandidate(2, issues, 'democrat');

    const gopRace = generateRace(1, issues, [gopCandidate]);
    const demRace = generateRace(2, issues, [demCandidate]);

    const gopBallot = generateBallot(1, [gopRace]);
    const demBallot = generateBallot(2, [demRace]);

    const generatedElection = generateElection('2022 Primary Election', [gopBallot, demBallot]);
    expect(generatedElection).toStrictEqual(expectedElection);
});
