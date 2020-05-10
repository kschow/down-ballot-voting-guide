import * as PropTypes from 'prop-types';
import React from 'react';
import LWV_DEM_SEN from '../../data/dem/lwv-dem-sen';
import LWV_GOP_SEN from '../../data/gop/lwv-gop-sen';

const RaceButton = ({ linkText, race, selectRace }) => (
    <div>
        <button
            className="link-button"
            onClick={() => selectRace(race)}
        >
            {linkText}
        </button>
    </div>
);

RaceButton.propTypes = {
    linkText: PropTypes.string,
    race: PropTypes.object,
    selectRace: PropTypes.func
};

const RaceSelection = ({ selectRace, races }) => {
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

RaceSelection.propTypes = {
    selectRace: PropTypes.func,
    races: PropTypes.arrayOf(PropTypes.object)
};

export default RaceSelection;
