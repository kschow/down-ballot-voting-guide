import React, { useState } from 'react';
import BaseLayout from '../components/Layout';
import RaceSelection from '../components/Shared/RaceSelection';
import Description from '../components/SingleSelect/Description';
import RaceGuide from '../components/SingleSelect/RaceGuide';

const SingleSelect = () => {
    const [pageTitle, setPageTitle] = useState('Single Selection');
    const [flowState, setFlowState] = useState('description');
    const [selectedRace, setSelectedRace] = useState(null);

    const selectRace = (race) => {
        setFlowState('guide');
        setSelectedRace(race);
        setPageTitle(race.raceName);
    };

    return (
        <BaseLayout title={pageTitle}>
            {
                flowState === 'description' &&
                    <>
                        <h2>Single Select</h2>
                        <Description />
                        <div>
                            To continue, click&nbsp;
                            <button
                                className="link-button"
                                onClick={() => {
                                    setFlowState('raceSelection');
                                    setPageTitle('Select a Race');
                                }}
                            >here
                            </button>
                        </div>
                    </>
            }
            { flowState === 'raceSelection' && <RaceSelection selectRace={selectRace} /> }
            {
                flowState === 'guide' && selectedRace &&
                <RaceGuide race={selectedRace} />
            }
        </BaseLayout>
    );
};

export default SingleSelect;
