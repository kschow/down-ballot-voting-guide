import Results from '../Results';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {
    generateCandidate,
    generateIssues,
    generateNullCandidate,
    generateRace
} from '@dbvg/shared-types';
import { generateScore } from '../../../data/__testdata__/testscoring';
import Guide from '../../../data/Guide';
import { Result } from '../../../data/Scoring';

/* eslint init-declarations: 0 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
const dummyBackToRaces = (): void => {};

describe('single clear result', () => {
    const generateResults = (): Result[] => {
        const issues = generateIssues(5);
        const candidateOne = generateCandidate(1, issues, 'democrat');
        const candidateTwo = generateCandidate(2, issues, 'democrat');
        const candidateThree = generateCandidate(3, issues, 'democrat');

        const candidates = [candidateOne, candidateTwo, candidateThree];
        const race = generateRace(4, issues, candidates);

        const guide = new Guide(race);
        guide.updateScore(generateScore(0, candidates, [0, 0, 1]));
        guide.updateScore(generateScore(1, candidates, [0, 0, 1]));
        guide.updateScore(generateScore(2, candidates, [0, 0, 1]));
        guide.updateScore(generateScore(3, candidates, [1, 0, 0]));
        guide.updateScore(generateScore(4, candidates, [0, 1, 0]));

        return guide.tallyResults();
    };

    it('Top scoring result is displayed saying it\'s the highest rated choice if it\'s a clear winner', () => {
        const component = <Results results={generateResults()} backToRaces={dummyBackToRaces} />;
        render(component);

        expect(screen.getByText('Based on your selections, ' +
            'the candidate you chose is: Candidate #3')).toBeInTheDocument();
    });

    it('only top scorer is displayed as a selected result and link to go back to races is available', () => {
        const component = <Results results={generateResults()} backToRaces={dummyBackToRaces} />;
        render(component);

        expect(screen.queryByText('Candidate #1')).not.toBeInTheDocument();
        expect(screen.queryByText('Candidate #2')).not.toBeInTheDocument();

        const topResult = screen.getByTestId('3');
        expect(topResult).toHaveClass('selected');

        const backToRacesButton = screen.getByRole('button', { name: /Back to Races/u });
        expect(backToRacesButton).not.toBeDisabled();
    });

});

describe('unclear top result', () => {
    const generateResults = (): Result[] => {
        const issues = generateIssues(5);
        const candidateEight = generateCandidate(8, issues, 'democrat');
        const candidateNine = generateCandidate(9, issues, 'democrat');
        const candidateTen = generateCandidate(10, issues, 'democrat');

        const candidates = [candidateEight, candidateNine, candidateTen];
        const race = generateRace(6, issues, candidates);

        const guide = new Guide(race);
        guide.updateScore(generateScore(0, candidates, [1, 0, 0]));
        guide.updateScore(generateScore(1, candidates, [1, 0, 0]));
        guide.updateScore(generateScore(2, candidates, [0, 0, 1]));
        guide.updateScore(generateScore(3, candidates, [0, 0, 1]));
        guide.updateScore(generateScore(4, candidates, [0, 0, 1]));

        return guide.tallyResults();
    };

    it('Top choices are displayed given there is no clear winner', () => {
        const component = <Results results={generateResults()} backToRaces={dummyBackToRaces} />;
        render(component);

        expect(screen.getByText('Based on your selections, ' +
            'it was difficult to decide a clear candidate.')).toBeInTheDocument();
        expect(screen.getByText('The candidates you selected answers for were: ' +
            'Candidate #10 and Candidate #8')).toBeInTheDocument();
        expect(screen.getByText('Please select one of them as a final choice ' +
            'after reviewing their answers by clicking on their name.')).toBeInTheDocument();
    });

    it('Back to Races link is unavailable until a choice is selected', () => {
        const component = <Results results={generateResults()} backToRaces={dummyBackToRaces} />;
        render(component);

        const candidateTen = screen.getByText('Candidate #10');
        const backToRacesButton = screen.getByRole('button', { name: /Back to Races/u });

        expect(backToRacesButton).toBeDisabled();
        fireEvent.click(candidateTen);
        expect(backToRacesButton).not.toBeDisabled();
    });
});

describe('candidate scorecard interactions', () => {
    const generateResults = (): Result[] => {
        const issues = generateIssues(3);
        const candidateFour = generateCandidate(4, issues, 'democrat');
        const candidateFive = generateCandidate(5, issues, 'democrat');
        const candidateSix = generateCandidate(6, issues, 'democrat');
        const candidateSeven = generateNullCandidate(7, issues, 'democrat');

        const candidates = [candidateFour, candidateFive, candidateSix, candidateSeven];
        const race = generateRace(13, issues, candidates);

        const guide = new Guide(race);
        guide.updateScore(generateScore(0, candidates, [1, 0, 0, 0]));
        guide.updateScore(generateScore(1, candidates, [0, 1, 0, 0]));
        guide.updateScore(generateScore(2, candidates, [0, 0, 1, 0]));

        return guide.tallyResults();
    };

    it('displays name of candidate and shows expandable headers for issues, ' +
        'clicking on a header shows the position for the clicked issue', () => {
        const component = <Results results={generateResults()} backToRaces={dummyBackToRaces} />;
        render(component);

        expect(screen.getByText('Candidate #4')).toBeInTheDocument();
        expect(screen.getByText('Candidate #5')).toBeInTheDocument();
        expect(screen.getByText('Candidate #6')).toBeInTheDocument();

        const issueZeroes = screen.getAllByText('Issue #0');
        expect(issueZeroes).toHaveLength(3);
        expect(screen.getAllByText('Issue #1')).toHaveLength(3);
        expect(screen.getAllByText('Issue #2')).toHaveLength(3);

        expect(screen.getByText('c4-i0')).not.toBeVisible();
        expect(screen.getByText('c5-i0')).not.toBeVisible();
        expect(screen.getByText('c6-i0')).not.toBeVisible();

        issueZeroes.forEach((element) => {
            fireEvent.click(element);
        });

        expect(screen.getByText('c4-i0')).toBeVisible();
        expect(screen.getByText('c5-i0')).toBeVisible();
        expect(screen.getByText('c6-i0')).toBeVisible();
    });
});
