import { act, render, screen } from '@testing-library/react';
import { SelectedCandidatesProvider, useSelectedCandidates } from '../SelectedCandidatesContext';
import { Ballot, County } from '@dbvg/shared-types';
import userEvent from '@testing-library/user-event';
import {useState} from "react";

beforeEach(() => {
    localStorage.clear();
});

const getSelectedCandidatesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('selectedCandidates'));
};

const testBallot = {
    ballotId: 105,
    ballotName: 'Ballot 105',
    races: [
        {
            raceId: 1,
            raceName: 'In All of Travis --not filtered out',
            county: County.TRAVIS,
            precincts: ['ALL'],
            issues: [],
            candidates: []
        },
        {
            raceId: 2,
            raceName: 'In Part of Travis (101, 203, 406) --filtered out',
            county: County.TRAVIS,
            precincts: [101, 203, 406],
            issues: [],
            candidates: []
        },
        {
            raceId: 3,
            raceName: 'In Part of Travis (365, 225) --not filtered out',
            county: County.TRAVIS,
            precincts: [365, 225],
            issues: [],
            candidates: []
        },
        {
            raceId: 4,
            raceName: 'In Williamson --filtered out',
            county: County.WILLIAMSON,
            precincts: ['ALL'],
            issues: [],
            candidates: []
        },
        {
            raceId: 5,
            raceName: 'In Both, all Travis, split Williamson (1, 5) --not filtered out',
            county: County.ALL,
            precincts: ['TRAVIS', 1, 5],
            issues: [],
            candidates: []
        },
        {
            raceId: 6,
            raceName: 'In Both, all Williamson, split Travis (365, 444) --not filtered out',
            county: County.ALL,
            precincts: ['WILLIAMSON', 365, 444],
            issues: [],
            candidates: []
        },
        {
            raceId: 7,
            raceName: 'In all --not filtered out',
            county: County.ALL,
            precincts: ['ALL'],
            issues: [],
            candidates: []
        },
        {
            raceId: 8,
            raceName: 'In all --not filtered out',
            county: County.ALL,
            precincts: ['ALL'],
            issues: [],
            candidates: [
                {
                    candidateId: 13,
                    candidateName: '',
                    positions: [],
                    campaignWebsite: 'string | null'
                }
            ]
        },
        {
            raceId: 9,
            raceName: 'In Both, all Williamson, split Travis (101, 206) --filtered out',
            county: County.ALL,
            precincts: ['WILLIAMSON', 101, 206],
            issues: [],
            candidates: []
        }
    ]
} as Ballot;

const TestComponent = () => {
    const {
        selectCandidate,
        selectCountyAndPrecinct,
        setBallotForSelection
    } = useSelectedCandidates();

    const [county, setCounty] = useState('' as County);
    const [precinct, setPrecinct] = useState(-1);

    return (
        <div>
            <button onClick={() => setCounty(County.TRAVIS)}>Select Travis County</button>
            <button onClick={() => setPrecinct(365)}>Select Precinct 365</button>
            <button onClick={() => selectCountyAndPrecinct(county, precinct)}>
                SelectCountyAndPrecinct
            </button>
            <button onClick={() => setBallotForSelection(testBallot)}>Select Ballot</button>
            <button onClick={() => selectCandidate(8, 13)}>Select Candidate 13</button>
            <button onClick={() => selectCandidate(9, 13)}>Bad Candidate Select</button>
        </div>
    );
};

const renderSelectedProvider = () => {
    render(
        <SelectedCandidatesProvider>
            <TestComponent />
        </SelectedCandidatesProvider>
    );
};

/*
 * Explicit calls to act to make sure the useEffect is called to save to localStorage.
 * Could also have used useLayoutEffect but I don't want to force the synchronous action here
 */
it('Updates county and precinct properly', () => {
    renderSelectedProvider();

    userEvent.click(screen.getByRole('button', { name: 'Select Travis County' }));
    userEvent.click(screen.getByRole('button', { name: 'Select Precinct 365' }));
    act(() => {
        userEvent.click(screen.getByRole('button', { name: 'SelectCountyAndPrecinct' }));
    });

    const selectedCandidates = getSelectedCandidatesFromLocalStorage();

    expect(selectedCandidates.county).toEqual(County.TRAVIS);
    expect(selectedCandidates.precinct).toEqual(365);
});

it('Updates with a ballot filtered by county/precinct', () => {
    renderSelectedProvider();

    userEvent.click(screen.getByRole('button', { name: 'Select Travis County' }));
    userEvent.click(screen.getByRole('button', { name: 'Select Precinct 365' }));
    act(() => {
        userEvent.click(screen.getByRole('button', { name: 'SelectCountyAndPrecinct' }));
    });
    act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Select Ballot' }));
    });

    const selectedCandidates = getSelectedCandidatesFromLocalStorage();
    const { selected } = selectedCandidates;

    expect(selected).toHaveLength(6);
    expect(selected).toContainEqual({ raceId: 1, candidateId: null });
    expect(selected).toContainEqual({ raceId: 3, candidateId: null });
    expect(selected).toContainEqual({ raceId: 5, candidateId: null });
    expect(selected).toContainEqual({ raceId: 6, candidateId: null });
    expect(selected).toContainEqual({ raceId: 7, candidateId: null });
    expect(selected).toContainEqual({ raceId: 8, candidateId: null });
});

it('Selects a candidate properly', () => {
    renderSelectedProvider();

    userEvent.click(screen.getByRole('button', { name: 'Select Travis County' }));
    userEvent.click(screen.getByRole('button', { name: 'Select Precinct 365' }));
    act(() => {
        userEvent.click(screen.getByRole('button', { name: 'SelectCountyAndPrecinct' }));
    });
    act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Select Ballot' }));
    });
    act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Select Candidate 13' }));
    });

    const selectedCandidates = getSelectedCandidatesFromLocalStorage();
    const { selected } = selectedCandidates;

    expect(selected).toContainEqual({ raceId: 8, candidateId: 13 });
});
