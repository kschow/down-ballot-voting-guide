import React, { FC } from 'react';
import { Ballot, Race } from '@dbvg/shared-types/src';
import styles from './Builders.module.css';

type BallotCardProps = {
    ballot: Ballot;
    updateBallot: (ballot: Ballot) => void;
    getNewId: () => number;
}

const BallotBuilder:FC<BallotCardProps> = ({ ballot, updateBallot, getNewId }) => {
    const updateName = (event:React.FormEvent<HTMLInputElement>) => {
        updateBallot({ ...ballot, ballotName: event.currentTarget.value });
    };

    const addRace = () => {
        updateBallot({
            ...ballot,
            races: [
                ...ballot.races,
                {
                    raceId: getNewId(),
                    raceName: null,
                    description: null,
                    issues: [],
                    candidates: []
                } as Race
            ]
        });
    };

    return (
        <div className={styles.builder}>
            <div>{`Ballot Name: ${ballot.ballotName}`}</div>
            <div>
                <label htmlFor="ballotName">Ballot Name</label>
                <input id="ballotName" onChange={updateName} />
            </div>

            <button onClick={addRace}>Add Race</button>
            {
                ballot.races.map((race, index) => {
                    return <div key={index}>{`Name: ${race.raceName}`}</div>;
                })
            }
        </div>
    );
};

export default BallotBuilder;
