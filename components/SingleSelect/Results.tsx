import React, { FunctionComponent } from 'react';
import { Result } from '../../data/Data';

type ResultsProps = {
    results: Result[];
};

const determineWinners = (results: Result[]): Result[] => {
    const [topResult, secondResult] = results;
    const maximumScore = topResult.issues.length;

    if (topResult.total > (maximumScore / 2) &&
       ((topResult.total - secondResult.total) > 1)) {
        return [topResult];
    }

    return results.filter((result) => result.total > 0);
};

const displayMultipleWinners = (winners: Result[]): string => {
    if (winners.length === 2) {
        return `${winners[0].candidateName} and ${winners[1].candidateName}`;
    }

    let displayedWinners = winners[0].candidateName;
    // eslint-disable-next-line id-length
    for (let i = 1; i < winners.length - 1; i++) {
        displayedWinners += `, ${winners[i].candidateName}`;
    }
    displayedWinners += `, and ${winners[winners.length - 1].candidateName}`;
    return displayedWinners;
};

const Results: FunctionComponent<ResultsProps> = ({ results }) => {
    const winners = determineWinners(results);

    return (
        <>
            <h2>Results</h2>
            {
                winners.length === 1 &&
                    <h3>
                        Based on your selections, the candidate you chose is: {winners[0].candidateName}
                    </h3>
            }
            {
                winners.length > 1 &&
                    <>
                        <h3>
                            Based on your selections, it was difficult to decide a clear candidate.
                        </h3>
                        <h4>
                            The candidates you selected answers for were: {displayMultipleWinners(winners)}
                        </h4>
                        <h4>
                            Please select one of them as a final choice after reviewing their answers.
                        </h4>
                    </>
            }
        </>
    );
};

export default Results;
