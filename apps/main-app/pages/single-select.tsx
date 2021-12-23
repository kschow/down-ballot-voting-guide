import { FunctionComponent, useState } from 'react';
import BaseLayout from '../components/Shared/Layout';
import RaceSelection from '../components/Shared/RaceSelection';
import Description from '../components/SingleSelect/Description';
import RaceGuide from '../components/SingleSelect/RaceGuide';
import Results from '../components/SingleSelect/Results';
import Guide from '../data/Guide';
import BallotSelection from '../components/Shared/BallotSelection';
import { Ballot, Election, Race } from '@dbvg/shared-types';

type SingleSelectProps = {
    election?: Election;
    issueOrder?: number[];
}

const SingleSelect: FunctionComponent<SingleSelectProps> = ({ election, issueOrder }) => {
    const [pageTitle, setPageTitle] = useState('Single Selection');
    const [flowState, setFlowState] = useState('description');
    const [selectedRace, setSelectedRace] = useState(null);
    const [guide, setGuide] = useState(null);
    const [raceResults, setRaceResults] = useState(null);
    const [races, setRaces] = useState([]);

    const goToRaces = (): void => {
        setFlowState('raceSelection');
        setPageTitle('Select a Race');
    };

    const goToBallots = (): void => {
        setFlowState('ballotSelection');
        setPageTitle('Select a Ballot');
    };

    const selectRace = (race: Race): void => {
        setFlowState('guide');
        setSelectedRace(race);
        setPageTitle(race.raceName);
        setGuide(new Guide(race, issueOrder));
        setRaceResults(null);
    };

    const selectBallot = (ballot: Ballot): void => {
        setRaces(ballot.races);
        goToRaces();
    };

    const finishRace = (): void => {
        setFlowState('results');
        setPageTitle(`${guide.race.raceName} - Results`);
        setRaceResults(guide.tallyResults());
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
                                onClick={goToBallots}
                            >here
                            </button>
                        </div>
                    </>
            }
            {
                flowState === 'ballotSelection' &&
                    <BallotSelection
                        selectBallot={selectBallot}
                        election={election}
                    />
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
                        finishRace={finishRace}
                    />
            }
            {
                flowState === 'results' && raceResults &&
                    <Results results={raceResults} backToRaces={goToRaces} />
            }
        </BaseLayout>
    );
};

export default SingleSelect;
