import { ReactElement, useState } from 'react';
import RaceSelection from '../components/Shared/RaceSelection';
import Description from '../components/SingleSelect/Description';
import RaceGuide from '../components/SingleSelect/RaceGuide';
import Results from '../components/SingleSelect/Results';
import Guide from '../data/Guide';
import BallotSelection from '../components/Shared/BallotSelection';
import { Ballot, Election, Race } from '@dbvg/shared-types';
import { Result } from '../data/Scoring';
import { SelectedCandidatesProvider, useSelectedCandidates } from '../context/SelectedCandidatesContext';
import HeadLayout from '../components/Shared/Layouts/HeadLayout';

type SingleSelectProps = {
    election?: Election;
    issueOrder?: number[];
}

const SingleSelect = ({ election, issueOrder }: SingleSelectProps) => {
    const [pageTitle, setPageTitle] = useState('Single Selection');
    const [flowState, setFlowState] = useState('description');
    const [selectedRace, setSelectedRace] = useState(null as Race);
    const [guide, setGuide] = useState(null as Guide);
    const [raceResults, setRaceResults] = useState(null as Result[]);
    const [ballot, setBallot] = useState(null as Ballot);
    const { setBallotForSelection, selectCandidate } = useSelectedCandidates();

    const goToRaces = (): void => {
        setFlowState('raceSelection');
        setPageTitle('Select a Race');
        setSelectedRace(null);
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

    const selectBallot = (selectedBallot: Ballot): void => {
        setBallot(selectedBallot);
        setBallotForSelection(selectedBallot);
        goToRaces();
    };

    const finishRace = (): void => {
        setFlowState('results');
        setPageTitle(`${guide.race.raceName} - Results`);
        setRaceResults(guide.tallyResults());
    };

    const updatePageTitle = (issueName: string): void => {
        setPageTitle(`${guide.race.raceName} - ${issueName}`);
    };

    const backToRaces = (candidateId: number) => {
        selectCandidate(selectedRace.raceId, candidateId);
        goToRaces();
    };

    return (
        <HeadLayout title={pageTitle}>
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
                        races={ballot.races}
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
                    <Results results={raceResults} backToRaces={backToRaces} />
            }
        </HeadLayout>
    );
};

SingleSelect.getContainer = (page: ReactElement) => <SelectedCandidatesProvider>{page}</SelectedCandidatesProvider>;

export default SingleSelect;
