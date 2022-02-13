import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {
    County,
    generateBallot,
    generateCandidate,
    generateElection,
    generateIssues,
    generateRace
} from '@dbvg/shared-types';
import SingleSelect from '../pages/guides/single-select';
import { SelectedCandidatesProvider } from '../context/SelectedCandidatesContext';

// eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
window.HTMLElement.prototype.scrollIntoView = (): void => {};

const issues = generateIssues(2);
const candidate1 = generateCandidate(5, issues, 'democrat');
const candidate2 = generateCandidate(8, issues, 'democrat');
const candidates = [candidate1, candidate2];

const race1 = generateRace(256, issues, candidates);
const race2 = generateRace(100, issues, candidates);
const race3 = generateRace(12, issues, candidates);
const filteredOutRace = generateRace(450, issues, candidates);
filteredOutRace.county = County.TRAVIS;
filteredOutRace.precincts = [15, 20]

const ballot1 = generateBallot(1, [race1, race2, filteredOutRace]);
const ballot2 = generateBallot(2, [race3]);
const election = generateElection('testElection', [ballot1, ballot2]);

it('follows the flow from beginning to end', () => {
    const issueOrder = [0, 1];

    /*
     * SelectedCandidatesProvider is normally added via nextjs
     * but that isn't available in the tests in the same way
     */
    const component =
        <SelectedCandidatesProvider>
            <SingleSelect election={election} issueOrder={issueOrder}/>
        </SelectedCandidatesProvider>;

    render(component);

    // Expect description page to exist
    expect(screen.queryByText('Single Select')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /here/u }));

    // Expect county/precinct input to exist
    expect(screen.queryByText(/Select a County/u)).toBeInTheDocument();
    const countySelect = screen.getByRole('combobox', { name: 'Select a County:' })
    userEvent.selectOptions(countySelect, ['TRAVIS']);
    userEvent.type(screen.getByLabelText(/Precinct:/u), '125');
    userEvent.click(screen.getByRole('button', { name: /Continue/u }));

    // Expect ballot selection page to exist with shown ballots
    expect(screen.queryByText(/Ballot #1/u)).toBeInTheDocument();
    expect(screen.queryByText(/Ballot #2/u)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Ballot #1/u));

    // Expect race selection page to exist with shown races for county/precinct
    expect(screen.queryByText(/Race #256/u)).toBeInTheDocument();
    expect(screen.queryByText(/Race #100/u)).toBeInTheDocument();
    expect(screen.queryByText(/Race #450/u)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/Race #100/u));

    // Run through the guide for selected race
    expect(screen.queryByText('c5-i0')).toBeInTheDocument();
    expect(screen.queryByText('c8-i0')).toBeInTheDocument();
    fireEvent.click(screen.getByText('c5-i0'));
    fireEvent.click(screen.getByRole('button', { name: /Continue/u }));

    expect(screen.queryByText('c5-i1')).toBeInTheDocument();
    expect(screen.queryByText('c8-i1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('c5-i1'));
    fireEvent.click(screen.getByRole('button', { name: /Finish/u }));

    expect(screen.queryByText('Results')).toBeInTheDocument();
    expect(screen.queryByText('Candidate #5')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Back to Races/u }));

    expect(screen.queryByText(/Race #256/u)).toBeInTheDocument();
    expect(screen.queryByText(/Selected: Candidate #5/u)).toBeInTheDocument();
    expect(screen.queryByText(/Race #100/u)).toBeInTheDocument();
});
