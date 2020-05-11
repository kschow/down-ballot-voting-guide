import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import BaseLayout from '../components/Shared/Layout';
import RaceSelection from '../components/Shared/RaceSelection';
import Description from '../components/SingleSelect/Description';
import RaceGuide from '../components/SingleSelect/RaceGuide';
import Guide from '../data/Guide';

const SingleSelect = ({ races, issueOrder }) => {
    const [pageTitle, setPageTitle] = useState('Single Selection');
    const [flowState, setFlowState] = useState('description');
    const [selectedRace, setSelectedRace] = useState(null);
    const [guide, setGuide] = useState(null);

    const selectRace = (race) => {
        setFlowState('guide');
        setSelectedRace(race);
        setPageTitle(race.raceName);
        setGuide(new Guide(race, issueOrder));
    };

    const updatePageTitle = (issueName) => {
        setPageTitle(`${guide.race.raceName} - ${issueName}`);
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
            {
                flowState === 'raceSelection' &&
                    <RaceSelection
                        selectRace={selectRace}
                        races={races}
                    />
            }
            {
                flowState === 'guide' && selectedRace &&
                    <RaceGuide
                        guide={guide}
                        updatePageTitle={updatePageTitle}
                    />
            }
        </BaseLayout>
    );
};

SingleSelect.propTypes = {
    races: PropTypes.arrayOf(PropTypes.object),
    issueOrder: PropTypes.arrayOf(PropTypes.number)
};

export default SingleSelect;
