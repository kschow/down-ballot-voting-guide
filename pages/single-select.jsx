import React, { useState } from 'react';
import BaseLayout from '../components/Layout';
import RaceSelection from '../components/Shared/RaceSelection';
import Description from '../components/SingleSelect/Description';

const SingleSelect = () => {
    const [flowState, setFlowState] = useState('description');
    const [selectedRace, setSelectedRace] = useState(null);

    const selectRace = (race) => {
        setFlowState('guide');
        setSelectedRace(race);
    };

    return (
        <BaseLayout title="Single Selection">
            <h2>Single Select</h2>
            {
                flowState === 'description' &&
                    <>
                        <Description />
                        <div>
                            To continue, click&nbsp;
                            <button
                                className="link-button"
                                onClick={() => setFlowState('raceSelection')}
                            >here
                            </button>
                        </div>
                    </>
            }
            { flowState === 'raceSelection' && <RaceSelection selectRace={selectRace}/> }
            { flowState === 'guide' && selectedRace && <div>guide</div> }
        </BaseLayout>
    );
};

export default SingleSelect;
