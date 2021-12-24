import {
    useEffect,
    useState,
    createContext,
    useContext,
    FC
} from 'react';
import { Ballot } from '@dbvg/shared-types';

type SelectedCandidate = {
    raceId: number;
    candidateId: number | null;
}

type SelectedCandidates = {
    ballotId: number;
    selected: SelectedCandidate[];
}

type SelectedActions = {
    selectCandidate: (raceId: number, candidateId: number) => void;
    setBallotForSelection: (ballot: Ballot) => void;
    getSelectedCandidate: (raceId: number) => number | null;
}

const SelectedCandidatesContext = createContext<SelectedActions>(null);

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

    const selectCandidate = (raceId: number, candidateId: number) => {
        const index = selectedCandidates.selected.findIndex((sc) => sc.raceId === raceId);
        selectedCandidates.selected.splice(index, 1, {
            raceId, candidateId
        });

        setSelectedCandidates({
            ...selectedCandidates,
            selected: selectedCandidates.selected
        });
    };

    const setBallotForSelection = (ballot: Ballot) => {
        if (selectedCandidates && selectedCandidates.ballotId === ballot.ballotId) {
            return;
        }

        const initialSelected = ballot.races.map((race) => {
            return {
                raceId: race.raceId,
                candidateId: null
            } as SelectedCandidate;
        });

        const selected = {
            ballotId: ballot.ballotId,
            selected: initialSelected
        } as SelectedCandidates;

        setSelectedCandidates(selected);
    };

    const getSelectedCandidate = (raceId: number) => {
        if (selectedCandidates) {
            const selectedCandidate = selectedCandidates.selected.find((sc) => sc.raceId === raceId);
            return selectedCandidate.candidateId;
        }

        return null;
    };

    return <SelectedCandidatesContext.Provider value={
        {
            selectCandidate,
            setBallotForSelection,
            getSelectedCandidate
        }}>{children}</SelectedCandidatesContext.Provider>;
};

const useSelectedCandidates = ():SelectedActions => {
    const context = useContext(SelectedCandidatesContext);

    // eslint-disable-next-line no-undefined
    if (context === null || context === undefined) {
        throw new Error('Selected Candidates must be used within a SelectedCandidatesProvider');
    }

    return context;
};

export { SelectedCandidatesProvider, useSelectedCandidates };
