import React, { FC, useEffect, useState } from 'react';
import { Election, Ballot } from '@dbvg/shared-types';
import BallotBuilder from './BallotBuilder';
import { useIdGenerator } from '../IdContext';
import styles from './Builders.module.scss';
import EditableField from '../Fields/EditableField';

const ElectionBuilder:FC = () => {
    const { getNewId } = useIdGenerator();
    const [election, setElection] = useState({
        electionName: '',
        ballots: []
    } as Election);

    useEffect(() => {
        localStorage.setItem('election', JSON.stringify(election));
    }, [election]);

    const updateName = (electionName: string) => {
        setElection({
            ...election,
            electionName
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
        <div className={styles.main}>
            <div className={styles.election}>
                <EditableField
                    name="Election Name"
                    label="Election Name:"
                    data={election.electionName}
                    updateField={updateName}
                />
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
                            />;
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ElectionBuilder;
