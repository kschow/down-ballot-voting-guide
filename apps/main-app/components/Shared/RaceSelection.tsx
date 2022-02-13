import { FunctionComponent } from 'react';
import { Candidate, Race } from '@dbvg/shared-types';
import global from './Global.module.scss';
import { useSelectedCandidates } from '../../context/SelectedCandidatesContext';

type RaceCardProps = {
    raceDisplay: string;
    race: Race;
    selectedCandidate: Candidate | null;
    selectRace(race: Race): void;
}

const RaceCard: FunctionComponent<RaceCardProps> = (props) => {
    const { raceDisplay, race, selectedCandidate, selectRace } = props;
    return (
        <div
            className={`${global.card} ${global.race}`}
            onClick={() => selectRace(race)}
        >
            <div className={global.flexColumn}>
                <span>{raceDisplay}</span>
                {
                    selectedCandidate && <span>{`Selected: ${selectedCandidate.candidateName}`}</span>
                }
            </div>
        </div>
    );
};

type RaceSelectionProps = {
    selectRace(race: Race): void;
    races?: Race[];
}

const RaceSelection: FunctionComponent<RaceSelectionProps> = ({ selectRace, races }) => {
    const { getSelectedCandidate, getSelectedRaces } = useSelectedCandidates();
    const selectedRaces = getSelectedRaces();

    return (
        <>
            <p>
                Please select between the following races:
            </p>
            {
                races
                    .filter((race) => selectedRaces.includes(race.raceId))
                    .map((race) => {
                        const selectedCandidateId = getSelectedCandidate(race.raceId);
                        const selectedCandidate =
                            race.candidates.find((candidate) => candidate.candidateId === selectedCandidateId);
                        return (
                            <RaceCard
                                key={race.raceId}
                                race={race}
                                raceDisplay={race.raceName}
                                selectedCandidate={selectedCandidate ? selectedCandidate : null}
                                selectRace={selectRace}
                            />
                        );
                    })
            }
        </>
    );
};

export default RaceSelection;
