import {
    useEffect,
    useState,
    createContext,
    useContext,
    FC
} from 'react';
import { Ballot, Race } from '@dbvg/shared-types';
import { isEqual } from 'lodash-es';

type SelectedCandidate = {
    raceId: number;
    candidateId: number | null;
}

type SelectedCandidates = {
    ballotId: number;
    county: string;
    precinct: number;
    selected: SelectedCandidate[];
}

type SelectionActions = {
    selectCountyAndPrecinct: (county: string, precinct: number) => void;
    setBallotForSelection: (ballot: Ballot) => void;
    selectCandidate: (raceId: number, candidateId: number) => void;
    getSelectedCandidate: (raceId: number) => number | null;
    getSelectedBallotId: () => number;
    getSelectedRaces: () => number[];
}

const SelectedCandidatesContext = createContext<SelectionActions>(null);

const SelectedCandidatesProvider:FC = ({ children }) => {
    const [selectedCandidates, setSelectedCandidates] = useState(null as SelectedCandidates);

    useEffect(() => {
        const hasStartedSelecting =
            JSON.parse(localStorage.getItem('selectedCandidates')) as SelectedCandidates;

        setSelectedCandidates(hasStartedSelecting);
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedCandidates', JSON.stringify(selectedCandidates));
    }, [selectedCandidates]);

    const selectCountyAndPrecinct = (county: string, precinct: number) => {
        const selected = {
            ...selectedCandidates,
            county,
            precinct
        } as SelectedCandidates;

        setSelectedCandidates(selected);
    };

    const isRaceInCountyPrecinct = (race: Race) => {
        if (race.county === 'ALL') {
            if (race.precincts.includes('ALL')) {
                return true;
            }
            if (race.precincts.includes('TRAVIS') &&
                selectedCandidates.county === 'TRAVIS') {
                return true;
            }
            if (race.precincts.includes('WILLIAMSON') &&
                selectedCandidates.county === 'WILLIAMSON') {
                return true;
            }
        }
        if (race.county === selectedCandidates.county) {
            if (race.precincts.includes('ALL')) {
                return true;
            }
        }
        return race.precincts.includes(selectedCandidates.precinct);
    };

    const setBallotForSelection = (ballot: Ballot) => {
        const currentlySelectedRaces = getSelectedRaces();

        const initialSelected = ballot.races
            .filter((race) => isRaceInCountyPrecinct(race))
            .map((race) => {
                return {
                    raceId: race.raceId,
                    candidateId: null
                } as SelectedCandidate;
            });

        const newSelectedRaces = initialSelected.map((sc) => sc.raceId);

        if (isEqual(currentlySelectedRaces.sort(), newSelectedRaces.sort())) {
            return;
        }

        setSelectedCandidates({
            ...selectedCandidates,
            ballotId: ballot.ballotId,
            selected: initialSelected
        });
    };

    const selectCandidate = (raceId: number, candidateId: number) => {
        const index = selectedCandidates.selected.findIndex((sc) => sc.raceId === raceId);

        if (index === -1) {
            throw new Error('Cannot select a candidate for a race you are not eligible for.');
        }

        selectedCandidates.selected.splice(index, 1,
            {
                raceId,
                candidateId
            });

        setSelectedCandidates({
            ...selectedCandidates,
            selected: selectedCandidates.selected
        });
    };

    const getSelectedCandidate = (raceId: number) => {
        if (selectedCandidates) {
            const selectedCandidate = selectedCandidates.selected.find((sc) => sc.raceId === raceId);
            return selectedCandidate?.candidateId;
        }

        return null;
    };

    const getSelectedBallotId = () => {
        return selectedCandidates.ballotId;
    };

    const getSelectedRaces = () => {
        if (selectedCandidates.selected) {
            return selectedCandidates.selected.map((selected) => selected.raceId);
        }
        return [];
    };

    return <SelectedCandidatesContext.Provider value={
        {
            selectCountyAndPrecinct,
            setBallotForSelection,
            selectCandidate,
            getSelectedCandidate,
            getSelectedBallotId,
            getSelectedRaces
        }}>{children}</SelectedCandidatesContext.Provider>;
};

const useSelectedCandidates = ():SelectionActions => {
    const context = useContext(SelectedCandidatesContext);

    // eslint-disable-next-line no-undefined
    if (context === null || context === undefined) {
        throw new Error('Selected Candidates must be used within a SelectedCandidatesProvider');
    }

    return context;
};

export { SelectedCandidatesProvider, useSelectedCandidates };
