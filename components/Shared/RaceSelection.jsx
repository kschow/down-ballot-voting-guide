import * as PropTypes from 'prop-types';
import React from 'react';
import LWV_DEM_SEN from '../../data/dem/lwv-dem-sen';
import LWV_GOP_SEN from '../../data/gop/lwv-gop-sen';

const RaceSelection = ({ selectRace }) => {
    // eslint-disable-next-line prefer-destructuring
    const democratUSsenatorRace = LWV_DEM_SEN.races[0];
    // eslint-disable-next-line prefer-destructuring
    const gopUSsenatorRace = LWV_GOP_SEN.races[0];

    return (
        <>
            <div>
                Please select between the following races:
            </div>
            <div>
                <button
                    className="link-button"
                    onClick={() => selectRace(democratUSsenatorRace)}
                >
                    Democratic Primary: US Senator
                </button>
            </div>
            <div>
                <button
                    className="link-button"
                    onClick={() => selectRace(gopUSsenatorRace)}
                >
                    GOP Primary: US Senator
                </button>
            </div>
        </>
    );
};

RaceSelection.propTypes = {
    selectRace: PropTypes.func
};

export default RaceSelection;
