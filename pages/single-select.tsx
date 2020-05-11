import React, { FunctionComponent, useState } from 'react';
import BaseLayout from '../components/Shared/Layout';
import RaceSelection from '../components/Shared/RaceSelection';
import Description from '../components/SingleSelect/Description';
import RaceGuide from '../components/SingleSelect/RaceGuide';
import Guide from '../data/Guide';
import { Race } from '../data/Data';

type SingleSelectProps = {
    races?: Race[];
    issueOrder?: number[];
}

const SingleSelect: FunctionComponent<SingleSelectProps> = ({ races, issueOrder }) => {
    const [pageTitle, setPageTitle] = useState('Single Selection');
    const [flowState, setFlowState] = useState('description');
    const [selectedRace, setSelectedRace] = useState(null);
    const [guide, setGuide] = useState(null);

    const selectRace = (race: Race): void => {
        setFlowState('guide');
        setSelectedRace(race);
        setPageTitle(race.raceName);
        setGuide(new Guide(race, issueOrder));
    };

    const updatePageTitle = (issueName): void => {
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
                                onClick={(): void => {
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

export default SingleSelect;
