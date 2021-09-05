import React, { FC, useEffect, useState } from 'react';
import { Election, Ballot } from '@dbvg/shared-types/src';
import BallotBuilder from './BallotBuilder';
import { useIdGenerator } from '../IdContext';
import styles from './Builders.module.css';

const ElectionBuilder:FC = () => {
    const { getNewId } = useIdGenerator();
    const [election, setElection] = useState({
        electionName: '',
        ballots: []
    } as Election);

    useEffect(() => {
        localStorage.setItem('election', JSON.stringify(election));
    }, [election]);

    const updateName = (event:React.FormEvent<HTMLInputElement>) => {
        setElection({
            ...election,
            electionName: event.currentTarget.value
        });
    };

    const addBallot = () => {
        const ballotId = getNewId();
        const newBallots = [
            ...election.ballots,
            {
                ballotId,
                ballotName: `Ballot #${ballotId}`,
                races: []
            } as Ballot
        ];
        setElection({
            ...election,
            ballots: newBallots
        });
    };

    const updateBallot = (ballot: Ballot) => {
        const updatedBallotIndex = election.ballots.findIndex((find) => find.ballotId === ballot.ballotId);
        election.ballots.splice(updatedBallotIndex, 1, ballot);
        setElection({
            ...election,
            ballots: election.ballots
        });
    };

    return (
        <div id="election" className={styles.main}>
            <div className={styles.builder}>
                <div>{`Election Name: ${election.electionName}`}</div>
                <div>
                    <label htmlFor="electionName">Election Name</label>
                    <input id="electionName" name="electionName" onChange={updateName} />
                </div>
                <div>
                    <button onClick={addBallot}>Add Ballot</button>
                </div>
                <div id="ballots">
                    {
                        election.ballots.map((ballot, index) => {
                            return <BallotBuilder
                                key={index}
                                ballot={ballot}
                                updateBallot={updateBallot}
                                getNewId={getNewId}
                            />;
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ElectionBuilder;
