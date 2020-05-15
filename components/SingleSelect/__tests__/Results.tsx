import Results from '../Results';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { generateCandidate, generateIssues, generateRace, generateScore } from '../../../data/__testdata__/testdata';
import Guide from '../../../data/Guide';

/* eslint init-declarations: 0 */

describe('single clear result', () => {
    let results;
    beforeEach(() => {
        const issues = generateIssues(5);
        const candidateOne = generateCandidate(1, 'democrat', issues);
        const candidateTwo = generateCandidate(2, 'democrat', issues);
        const candidateThree = generateCandidate(3, 'democrat', issues);

        const candidates = [candidateOne, candidateTwo, candidateThree];
        const race = generateRace(4, issues, candidates);

        const guide = new Guide(race);
        guide.updateScore(generateScore(0, candidates, [0, 0, 1]));
        guide.updateScore(generateScore(1, candidates, [0, 0, 1]));
        guide.updateScore(generateScore(2, candidates, [0, 0, 1]));
        guide.updateScore(generateScore(3, candidates, [1, 0, 0]));
        guide.updateScore(generateScore(4, candidates, [0, 1, 0]));

        results = guide.tallyResults();
    });

    it('Top scoring result is displayed saying it\'s the highest rated choice if it\'s a clear winner', () => {
        const component = <Results results={results} />;
        const { queryByText } = render(component);

        expect(queryByText('Based on your selections, ' +
            'the candidate you chose is: candidate 3')).toBeInTheDocument();
    });

    it('only top scorer is displayed as a selected result and link to go back to races is available', () => {
        const component = <Results results={results} />;
        const { getByText, getByTestId, queryByTestId } = render(component);

        expect(queryByTestId('1')).not.toBeInTheDocument();
        expect(queryByTestId('2')).not.toBeInTheDocument();

        const topResult = getByTestId('3');
        expect(topResult).toHaveClass('selected');

        const backToRacesButton = getByText('Back to Races');
        expect(backToRacesButton).not.toBeDisabled();
    });

});

describe('unclear top result', () => {
    let results;
    beforeEach(() => {
        const issues = generateIssues(5);
        const candidateEight = generateCandidate(8, 'democrat', issues);
        const candidateNine = generateCandidate(9, 'democrat', issues);
        const candidateTen = generateCandidate(10, 'democrat', issues);

        const candidates = [candidateEight, candidateNine, candidateTen];
        const race = generateRace(6, issues, candidates);

        const guide = new Guide(race);
        guide.updateScore(generateScore(0, candidates, [1, 0, 0]));
        guide.updateScore(generateScore(1, candidates, [1, 0, 0]));
        guide.updateScore(generateScore(2, candidates, [0, 0, 1]));
        guide.updateScore(generateScore(3, candidates, [0, 0, 1]));
        guide.updateScore(generateScore(4, candidates, [0, 0, 1]));

        results = guide.tallyResults();
    });

    it('Top choices are displayed given there is no clear winner', () => {
        const component = <Results results={results} />;
        const { queryByText } = render(component);

        expect(queryByText('Based on your selections, ' +
            'it was difficult to decide a clear candidate.')).toBeInTheDocument();
        expect(queryByText('The candidates you selected answers for were: ' +
            'candidate 10 and candidate 8')).toBeInTheDocument();
        expect(queryByText('Please select one of them as a final choice ' +
            'after reviewing their answers.')).toBeInTheDocument();
    });

    it('Back to Races link is unavailable until a choice is selected', () => {
        const component = <Results results={results} />;
        const { getByText } = render(component);

        const candidateTen = getByText('candidate 10');
        const backToRacesButton = getByText('Back to Races');

        expect(backToRacesButton).toBeDisabled();
        fireEvent.click(candidateTen);
        expect(backToRacesButton).not.toBeDisabled();
    });
});
