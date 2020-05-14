import {
    generateCandidate,
    generateElection,
    generateIssues,
    generateNullCandidate,
    generateRace,
    generateScore
} from './testdata';

it('generateIssues generates expected issues', () => {
    const expectedIssues = [
        {
            issueId: 0,
            issueName: 'issue 0',
            question: 'issue question 0'
        },
        {
            issueId: 1,
            issueName: 'issue 1',
            question: 'issue question 1'
        },
        {
            issueId: 2,
            issueName: 'issue 2',
            question: 'issue question 2'
        }
    ];

    const generatedIssues = generateIssues(3);
    expect(generatedIssues).toStrictEqual(expectedIssues);
});

it('generateCandidate generates the expected candidate', () => {
    const expectedCandidate = {
        'candidateId': 10,
        'candidateName': 'candidate 10',
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
        'education': 'Some School',
        'campaignWebsite': 'http://google.com',
        'facebook': 'https://facebook.com',
        'twitter': 'http://twitter.com',
        'video': 'https://youtube.com'
    };

    const issues = generateIssues(2);

    const generatedCandidate = generateCandidate(10, 'republican', issues);
    expect(generatedCandidate).toStrictEqual(expectedCandidate);
});

it('generateNullCandidate generates the expected null candidate', () => {
    const expectedCandidate = {
        'candidateId': 8,
        'candidateName': 'candidate 8',
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
        'education': null,
        'campaignWebsite': null,
        'facebook': null,
        'twitter': null,
        'video': null
    };

    const issues = generateIssues(3);

    const generatedCandidate = generateNullCandidate(8, 'democrat', issues);
    expect(generatedCandidate).toStrictEqual(expectedCandidate);
});

it('generateRace generates the expected race', () => {
    const expectedRace = {
        raceId: 5,
        raceName: 'race 5',
        description: 'race description 5',
        issues: [
            {
                issueId: 0,
                issueName: 'issue 0',
                question: 'issue question 0'
            },
            {
                issueId: 1,
                issueName: 'issue 1',
                question: 'issue question 1'
            }
        ],
        candidates: [
            {
                'candidateId': 1,
                'candidateName': 'candidate 1',
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
                'education': 'Some School',
                'campaignWebsite': 'http://google.com',
                'facebook': 'https://facebook.com',
                'twitter': 'http://twitter.com',
                'video': 'https://youtube.com'
            },
            {
                'candidateId': 2,
                'candidateName': 'candidate 2',
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
                'education': null,
                'campaignWebsite': null,
                'facebook': null,
                'twitter': null,
                'video': null
            }
        ]
    };

    const issues = generateIssues(2);
    const candidateOne = generateCandidate(1, 'democrat', issues);
    const candidateTwo = generateNullCandidate(2, 'democrat', issues);
    const candidates = [candidateOne, candidateTwo];

    const generatedRace = generateRace(5, issues, candidates);
    expect(generatedRace).toStrictEqual(expectedRace);
});

it('generateElection generates the expected election', () => {
    const expectedElection = {
        'type': 'primary',
        'party': 'republican',
        'races': [
            {
                'raceId': 1,
                'raceName': 'race 1',
                'description': 'race description 1',
                'issues': [
                    {
                        'issueId': 0,
                        'issueName': 'issue 0',
                        'question': 'issue question 0'
                    },
                    {
                        'issueId': 1,
                        'issueName': 'issue 1',
                        'question': 'issue question 1'
                    }
                ],
                'candidates': [
                    {
                        'candidateId': 2,
                        'candidateName': 'candidate 2',
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
                        'education': null,
                        'campaignWebsite': null,
                        'facebook': null,
                        'twitter': null,
                        'video': null
                    }
                ]
            },
            {
                'raceId': 2,
                'raceName': 'race 2',
                'description': 'race description 2',
                'issues': [
                    {
                        'issueId': 0,
                        'issueName': 'issue 0',
                        'question': 'issue question 0'
                    },
                    {
                        'issueId': 1,
                        'issueName': 'issue 1',
                        'question': 'issue question 1'
                    }
                ],
                'candidates': [
                    {
                        'candidateId': 1,
                        'candidateName': 'candidate 1',
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
                        'education': null,
                        'campaignWebsite': null,
                        'facebook': null,
                        'twitter': null,
                        'video': null
                    }
                ]
            },
            {
                'raceId': 3,
                'raceName': 'race 3',
                'description': 'race description 3',
                'issues': [
                    {
                        'issueId': 0,
                        'issueName': 'issue 0',
                        'question': 'issue question 0'
                    },
                    {
                        'issueId': 2,
                        'issueName': 'issue 2',
                        'question': 'issue question 2'
                    }
                ],
                'candidates': [
                    {
                        'candidateId': 3,
                        'candidateName': 'candidate 3',
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
                        'education': null,
                        'campaignWebsite': null,
                        'facebook': null,
                        'twitter': null,
                        'video': null
                    },
                    {
                        'candidateId': 4,
                        'candidateName': 'candidate 4',
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
                        'education': null,
                        'campaignWebsite': null,
                        'facebook': null,
                        'twitter': null,
                        'video': null
                    }
                ]
            }
        ]
    };

    const allIssues = generateIssues(3);
    const race1and2Issues = [...allIssues].slice(0, 2);
    const race3Issues = [...allIssues];
    race3Issues.splice(1, 1);

    const candidate1 = generateNullCandidate(1, 'republican', race1and2Issues);
    const candidate2 = generateNullCandidate(2, 'republican', race1and2Issues);
    const candidate3 = generateNullCandidate(3, 'republican', race3Issues);
    const candidate4 = generateNullCandidate(4, 'republican', race3Issues);

    const race1 = generateRace(1, race1and2Issues, [candidate2]);
    const race2 = generateRace(2, race1and2Issues, [candidate1]);
    const race3 = generateRace(3, race3Issues, [candidate3, candidate4]);

    const generatedElection =
        generateElection('primary', 'republican', [
            race1,
            race2,
            race3
        ]);

    expect(generatedElection).toStrictEqual(expectedElection);
});

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
    const candidateOne = generateCandidate(1, 'democrat', issues);
    const candidateThree = generateCandidate(3, 'republican', issues);
    const candidateSix = generateCandidate(6, 'democrat', issues);

    const generatedScore = generateScore(2, [candidateThree, candidateSix, candidateOne], [2, 1, 8]);
    expect(generatedScore).toStrictEqual(expectedScore);
});
