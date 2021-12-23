import { fireEvent, render, screen } from '@testing-library/react';
import {
    generateBallot,
    generateCandidate,
    generateElection,
    generateIssues,
    generateRace
} from '@dbvg/shared-types';
import SingleSelect from '../pages/single-select';

// eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
window.HTMLElement.prototype.scrollIntoView = (): void => {};

const issues = generateIssues(2);
const candidate1 = generateCandidate(5, issues, 'democrat');
const candidate2 = generateCandidate(8, issues, 'democrat');
const candidates = [candidate1, candidate2];

const race1 = generateRace(256, issues, candidates);
const race2 = generateRace(100, issues, candidates);
const race3 = generateRace(12, issues, candidates);

const ballot1 = generateBallot(1, [race1, race2]);
const ballot2 = generateBallot(2, [race3]);
const election = generateElection('testElection', [ballot1, ballot2]);

it('follows the flow from beginning to end', () => {
    const issueOrder = [0, 1];
    const component = <SingleSelect election={election} issueOrder={issueOrder}/>;

    render(component);

    // Expect description page to exist
    expect(screen.getByText('Single Select')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /here/u }));

    // Expect ballot selection page to exist with shown ballots
    expect(screen.getByText(/Ballot #1/u)).toBeInTheDocument();
    expect(screen.getByText(/Ballot #2/u)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Ballot #1/u));

    // Expect race selection page to exist with shown races
    expect(screen.getByText(/Race #256/u)).toBeInTheDocument();
    expect(screen.getByText(/Race #100/u)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Race #100/u));

    // Run through the guide for selected race
    expect(screen.getByText('c5-i0')).toBeInTheDocument();
    expect(screen.getByText('c8-i0')).toBeInTheDocument();
    fireEvent.click(screen.getByText('c5-i0'));
    fireEvent.click(screen.getByRole('button', { name: /Continue/u }));

    expect(screen.getByText('c5-i1')).toBeInTheDocument();
    expect(screen.getByText('c8-i1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('c5-i1'));
    fireEvent.click(screen.getByRole('button', { name: /Finish/u }));

    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText('Candidate #5')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Back to Races/u }));

    expect(screen.getByText(/Race #256/u)).toBeInTheDocument();
    expect(screen.getByText(/Race #100/u)).toBeInTheDocument();
});
