import React, { FunctionComponent } from 'react';
import LWV_DEM_SEN from '../../data/dem/lwv-dem-sen';
import LWV_GOP_SEN from '../../data/gop/lwv-gop-sen';
import { Race } from '../../data/Data';

type RaceButtonProps = {
    linkText: string;
    race: Race;
    selectRace(race: Race): void;
}

const RaceButton: FunctionComponent<RaceButtonProps> = ({ linkText, race, selectRace }) => (
    <div>
        <button
            className="link-button"
            onClick={(): void => selectRace(race)}
        >
            {linkText}
        </button>
    </div>
);

type RaceSelectionProps = {
    selectRace(race: Race): void;
    races?: Race[];
}

const RaceSelection: FunctionComponent<RaceSelectionProps> = ({ selectRace, races }) => {
    // eslint-disable-next-line prefer-destructuring
    const democratUSsenatorRace = LWV_DEM_SEN.races[0] as Race;
    // eslint-disable-next-line prefer-destructuring
    const gopUSsenatorRace = LWV_GOP_SEN.races[0] as Race;

    return (
        <>
            <div>
                Please select between the following races:
            </div>
            {
                races ?
                    races.map((race) => {
                        return (
                            <RaceButton
                                key={race.raceId}
                                race={race}
                                linkText={race.raceName}
                                selectRace={selectRace}
                            />
                        );
                    }) :
                    <>
                        <RaceButton
                            race={democratUSsenatorRace}
                            linkText="Democratic Primary: US Senator"
                            selectRace={selectRace}
                        />
                        <RaceButton
                            race={gopUSsenatorRace}
                            linkText="GOP Primary: US Senator"
                            selectRace={selectRace}
                        />
                    </>
            }
        </>
    );
};

export default RaceSelection;
