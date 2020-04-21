import { generateCandidate, generateIssues, generateNullCandidate, generateRace } from './testdata';

it('generateIssues generates expected issues', () => {
    const expectedIssues = [
        {
            issueId: 0,
            issueName: '0',
            question: '0'
        },
        {
            issueId: 1,
            issueName: '1',
            question: '1'
        },
        {
            issueId: 2,
            issueName: '2',
            question: '2'
        }
    ];

    const generatedIssues = generateIssues(3);
    expect(generatedIssues).toStrictEqual(expectedIssues);
});

it('generateCandidate generates the expected candidate', () => {
    const expectedCandidate = {
        'candidateId': 10,
        'candidateName': '10',
        party: 'democrat',
        positions: [
            {
                issueId: 0,
                position: '0'
            },
            {
                issueId: 1,
                position: '1'
            }
        ],
        'education': 'Some School',
        'campaignWebsite': 'http://google.com',
        'facebook': 'https://facebook.com',
        'twitter': 'http://twitter.com',
        'video': 'https://youtube.com'
    };

    const issues = generateIssues(2);

    const generatedCandidate = generateCandidate(10, 'democrat', issues);
    expect(generatedCandidate).toStrictEqual(expectedCandidate);
});

it('generateNullCandidate generates the expected null candidate', () => {
    const expectedCandidate = {
        'candidateId': 8,
        'candidateName': '8',
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
        raceName: '5',
        description: '5',
        issues: [
            {
                issueId: 0,
                issueName: '0',
                question: '0'
            },
            {
                issueId: 1,
                issueName: '1',
                question: '1'
            }
        ],
        candidates: [
            {
                'candidateId': 1,
                'candidateName': '1',
                party: 'democrat',
                positions: [
                    {
                        issueId: 0,
                        position: '0'
                    },
                    {
                        issueId: 1,
                        position: '1'
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
                'candidateName': '2',
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
