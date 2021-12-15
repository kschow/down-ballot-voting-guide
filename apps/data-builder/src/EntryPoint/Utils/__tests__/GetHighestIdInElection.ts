import { Election } from '@dbvg/shared-types';
import getHighestIdInElection from '../GetHighestIdInElection';

it('gets the highest id when the highest id is in a ballot', () => {
    const election = {
        ballots: [
            {
                ballotId: 125,
                races: [
                    {
                        raceId: 100,
                        issues: [
                            {
                                issueId: 2
                            },
                            {
                                issueId: 5
                            }
                        ],
                        candidates: [
                            {
                                candidateId: 12
                            },
                            {
                                candidateId: 75
                            }
                        ]
                    }
                ]
            },
            {
                ballotId: 33,
                races: []
            }
        ]
    } as Election;

    expect(getHighestIdInElection(election)).toBe(125);
});

it('gets the highest id when the highest id is in a race', () => {
    const election = {
        ballots: [
            {
                ballotId: 125,
                races: [
                    {
                        raceId: 100,
                        issues: [
                            {
                                issueId: 2
                            },
                            {
                                issueId: 5
                            }
                        ],
                        candidates: [
                            {
                                candidateId: 12
                            },
                            {
                                candidateId: 75
                            }
                        ]
                    },
                    {
                        raceId: 214,
                        issues: [],
                        candidates: []
                    }
                ]
            },
            {
                ballotId: 33,
                races: []
            }
        ]
    } as Election;

    expect(getHighestIdInElection(election)).toBe(214);
});

it('gets the highest id when the highest id is in an issue', () => {
    const election = {
        ballots: [
            {
                ballotId: 125,
                races: [
                    {
                        raceId: 100,
                        issues: [
                            {
                                issueId: 2
                            },
                            {
                                issueId: 5
                            }
                        ],
                        candidates: [
                            {
                                candidateId: 12
                            },
                            {
                                candidateId: 75
                            }
                        ]
                    },
                    {
                        raceId: 214,
                        issues: [
                            {
                                issueId: 712
                            }
                        ],
                        candidates: []
                    }
                ]
            }
        ]
    } as Election;

    expect(getHighestIdInElection(election)).toBe(712);
});

it('gets the highest id when the highest id is in a candidate', () => {
    const election = {
        ballots: [
            {
                ballotId: 125,
                races: [
                    {
                        raceId: 100,
                        issues: [
                            {
                                issueId: 2
                            },
                            {
                                issueId: 5
                            }
                        ],
                        candidates: [
                            {
                                candidateId: 312
                            },
                            {
                                candidateId: 75
                            }
                        ]
                    },
                    {
                        raceId: 214,
                        issues: [],
                        candidates: []
                    }
                ]
            },
            {
                ballotId: 33,
                races: []
            }
        ]
    } as Election;

    expect(getHighestIdInElection(election)).toBe(312);
});
