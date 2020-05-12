import Results from '../Results';
import { Result } from '../../../data/Data';
import React from 'react';
import { render } from '@testing-library/react';

it('Top scoring result is displayed saying it\'s the highest rated choice if it\'s a clear winner', () => {
    const results = [
        {
            candidateId: 3,
            candidateName: 'candidate 3',
            total: 3,
            issues: [
                {
                    issueName: 'Immigration',
                    score: 1
                },
                {
                    issueName: 'Gun Violence',
                    score: 1
                },
                {
                    issueName: 'Health Care',
                    score: 1
                },
                {
                    issueName: 'Background',
                    score: 0
                },
                {
                    issueName: 'Other Issues',
                    score: 0
                }
            ]
        },
        {
            candidateId: 1,
            candidateName: 'candidate 1',
            total: 1,
            issues: [
                {
                    issueName: 'Immigration',
                    score: 0
                },
                {
                    issueName: 'Gun Violence',
                    score: 0
                },
                {
                    issueName: 'Health Care',
                    score: 0
                },
                {
                    issueName: 'Background',
                    score: 1
                },
                {
                    issueName: 'Other Issues',
                    score: 0
                }
            ]
        },
        {
            candidateId: 2,
            candidateName: 'candidate 2',
            total: 1,
            issues: [
                {
                    issueName: 'Immigration',
                    score: 0
                },
                {
                    issueName: 'Gun Violence',
                    score: 0
                },
                {
                    issueName: 'Health Care',
                    score: 0
                },
                {
                    issueName: 'Background',
                    score: 0
                },
                {
                    issueName: 'Other Issues',
                    score: 1
                }
            ]
        }
    ] as Result[];

    const component = <Results results={results} />;
    const { queryByText } = render(component);

    expect(queryByText('Based on your selections, ' +
        'the candidate you chose is: candidate 3')).toBeInTheDocument();
});

it('Top choices are displayed given there is no clear winner', () => {
    const results = [
        {
            candidateId: 3,
            candidateName: 'candidate 3',
            total: 3,
            issues: [
                {
                    issueName: 'Immigration',
                    score: 1
                },
                {
                    issueName: 'Gun Violence',
                    score: 1
                },
                {
                    issueName: 'Health Care',
                    score: 1
                },
                {
                    issueName: 'Background',
                    score: 0
                },
                {
                    issueName: 'Other Issues',
                    score: 0
                },
                {
                    issueName: 'Income Inequality',
                    score: 0
                }
            ]
        },
        {
            candidateId: 1,
            candidateName: 'candidate 1',
            total: 2,
            issues: [
                {
                    issueName: 'Immigration',
                    score: 0
                },
                {
                    issueName: 'Gun Violence',
                    score: 0
                },
                {
                    issueName: 'Health Care',
                    score: 0
                },
                {
                    issueName: 'Background',
                    score: 1
                },
                {
                    issueName: 'Other Issues',
                    score: 1
                },
                {
                    issueName: 'Income Inequality',
                    score: 0
                }
            ]
        },
        {
            candidateId: 2,
            candidateName: 'candidate 2',
            total: 1,
            issues: [
                {
                    issueName: 'Immigration',
                    score: 0
                },
                {
                    issueName: 'Gun Violence',
                    score: 0
                },
                {
                    issueName: 'Health Care',
                    score: 0
                },
                {
                    issueName: 'Background',
                    score: 0
                },
                {
                    issueName: 'Other Issues',
                    score: 0
                },
                {
                    issueName: 'Income Inequality',
                    score: 1
                }
            ]
        }
    ] as Result[];

    const component = <Results results={results} />;
    const { queryByText } = render(component);

    expect(queryByText('Based on your selections, it was difficult to decide a clear candidate.')).toBeInTheDocument();
    expect(queryByText('The candidates you selected answers for were: ' +
        'candidate 3, candidate 1, and candidate 2')).toBeInTheDocument();
    expect(queryByText('Please select one of them as a final choice ' +
        'after reviewing their answers.')).toBeInTheDocument();
});
