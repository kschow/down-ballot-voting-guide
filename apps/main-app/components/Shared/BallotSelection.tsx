import { FC } from 'react';
import currentElection from '../../data/current_election/2022 Primary Election.json';
import { Ballot, Election } from '@dbvg/shared-types';
import global from './Global.module.scss';

type BallotCardProps = {
    ballotDisplay: string;
    ballot: Ballot;
    selectBallot: (ballot: Ballot) => void;
};

const BallotCard: FC<BallotCardProps> = ({ ballotDisplay, ballot, selectBallot }) => {
    return (
        <div
            className={`${global.card} ${global.ballot}`}
            onClick={() => selectBallot(ballot)}
        >
            {ballotDisplay}
        </div>
    );
};

type BallotSelectionProps = {
    selectBallot: (ballot: Ballot) => void;
    election?: Election;
};

const BallotSelection: FC<BallotSelectionProps> = ({ selectBallot, election }) => {
    const ballots = election ? election.ballots : currentElection.ballots;
    return (
        <>
            <p>Please select a ballot:</p>
            {
                ballots.map((ballot) => {
                    return (
                        <BallotCard
                            key={ballot.ballotId}
                            ballotDisplay={ballot.ballotName}
                            ballot={ballot}
                            selectBallot={selectBallot}
                        />
                    );
                })
            }
        </>
    );
};

export default BallotSelection;
