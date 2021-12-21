import React, { FunctionComponent } from 'react';
import Election from '../../data/current_election/2020 Primary Election.json';
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
    const gopUSsenatorRace = Election.ballots[0].races;
    // eslint-disable-next-line prefer-destructuring
    const democratUSsenatorRace = Election.ballots[1].races;

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
                            race={democratUSsenatorRace[0]}
                            raceDisplay="Democratic Primary: US Senator"
                            selectRace={selectRace}
                        />
                        <RaceCard
                            race={gopUSsenatorRace[0]}
                            raceDisplay="GOP Primary: US Senator"
                            selectRace={selectRace}
                        />
                    </>
            }
        </>
    );
};

export default RaceSelection;
