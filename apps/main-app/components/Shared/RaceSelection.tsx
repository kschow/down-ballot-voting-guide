import { FunctionComponent } from 'react';
import { Race } from '@dbvg/shared-types';
import global from './Global.module.scss';

type RaceCardProps = {
    raceDisplay: string;
    race: Race;
    selectRace(race: Race): void;
}

const RaceCard: FunctionComponent<RaceCardProps> = ({ raceDisplay, race, selectRace }) => (
    <div
        className={`${global.card} ${global.race}`}
        onClick={() => selectRace(race)}
    >
        {raceDisplay}
    </div>
);

type RaceSelectionProps = {
    selectRace(race: Race): void;
    races?: Race[];
}

const RaceSelection: FunctionComponent<RaceSelectionProps> = ({ selectRace, races }) => {
    return (
        <>
            <p>
                Please select between the following races:
            </p>
            {
                races.map((race) => {
                    return (
                        <RaceCard
                            key={race.raceId}
                            race={race}
                            raceDisplay={race.raceName}
                            selectRace={selectRace}
                        />
                    );
                })
            }
        </>
    );
};

export default RaceSelection;
