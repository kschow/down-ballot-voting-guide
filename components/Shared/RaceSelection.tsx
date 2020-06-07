import React, { FunctionComponent } from 'react';
import LWV_DEM_SEN from '../../data/dem/lwv-dem-sen';
import LWV_GOP_SEN from '../../data/gop/lwv-gop-sen';
import { Race } from '../../data/Data';
import global from './Global.module.scss';

type RaceCardProps = {
    raceDisplay: string;
    race: Race;
    selectRace(race: Race): void;
}

const RaceCard: FunctionComponent<RaceCardProps> = ({ raceDisplay, race, selectRace }) => (
    <div
        className={`${global.card} ${global.race}`}
        onClick={(): void => selectRace(race)}
    >
        {raceDisplay}
    </div>
);

type RaceSelectionProps = {
    selectRace(race: Race): void;
    races?: Race[];
}

const RaceSelection: FunctionComponent<RaceSelectionProps> = ({ selectRace, races }) => {
    // eslint-disable-next-line prefer-destructuring
    const democratUSsenatorRace = LWV_DEM_SEN.races[0];
    // eslint-disable-next-line prefer-destructuring
    const gopUSsenatorRace = LWV_GOP_SEN.races[0];

    return (
        <>
            <div>
                Please select between the following races:
            </div>
            {
                races ?
                    races.map((race) => {
                        return (
                            <RaceCard
                                key={race.raceId}
                                race={race}
                                raceDisplay={race.raceName}
                                selectRace={selectRace}
                            />
                        );
                    }) :
                    <>
                        <RaceCard
                            race={democratUSsenatorRace}
                            raceDisplay="Democratic Primary: US Senator"
                            selectRace={selectRace}
                        />
                        <RaceCard
                            race={gopUSsenatorRace}
                            raceDisplay="GOP Primary: US Senator"
                            selectRace={selectRace}
                        />
                    </>
            }
        </>
    );
};

export default RaceSelection;
