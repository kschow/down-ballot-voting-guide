import React, { FC } from 'react';
import { Ballot, Race } from '@dbvg/shared-types/src';
import styles from './Builders.module.css';
import EditableField from '../Fields/EditableField';
import { useIdGenerator } from '../IdContext';

type BallotBuilderProps = {
    ballot: Ballot;
    updateBallot: (ballot: Ballot) => void;
}

const BallotBuilder:FC<BallotBuilderProps> = ({ ballot, updateBallot }) => {
    const { getNewId } = useIdGenerator();

    const updateName = (ballotName: string) => {
        updateBallot({ ...ballot, ballotName });
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
            <EditableField
                name={`Ballot #${ballot.ballotId} Name`}
                label="Ballot Name:"
                data={ballot.ballotName}
                updateField={updateName}
            />
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
