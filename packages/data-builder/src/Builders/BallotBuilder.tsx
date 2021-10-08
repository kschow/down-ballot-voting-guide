import React, { FC } from 'react';
import { Ballot, generateRace, Race } from '@dbvg/shared-types';
import styles from './Builders.module.scss';
import EditableField from '../Fields/EditableField';
import { useIdGenerator } from './IdContext';
import RaceBuilder from './RaceBuilder';
import FieldTypes from '../Fields/FieldTypes';
import useCollapsed from './UseCollapsed';

type BallotBuilderProps = {
    ballot: Ballot;
    updateBallot: (ballot: Ballot) => void;
}

const BallotBuilder:FC<BallotBuilderProps> = ({ ballot, updateBallot }) => {
    const { getNewId } = useIdGenerator();
    const ballotIdentifier = `Ballot #${ballot.ballotId}`;
    const [collapsed, CollapseButton] = useCollapsed(ballotIdentifier);

    const updateName = (ballotName: string) => {
        updateBallot({ ...ballot, ballotName });
    };

    const addRace = () => {
        const raceId = getNewId();
        updateBallot({
            ...ballot,
            races: [
                ...ballot.races,
                generateRace(raceId)
            ]
        });
    };

    const updateRace = (race: Race) => {
        const updatedRaceIndex = ballot.races.findIndex((find) => find.raceId === race.raceId);
        ballot.races.splice(updatedRaceIndex, 1, race);
        updateBallot({
            ...ballot,
            races: ballot.races
        });
    };

    return (
        <div className={styles.Builder}>
            <div className={styles.Collapse}>
                <EditableField
                    type={FieldTypes.Input}
                    name={`${ballotIdentifier} Name`}
                    label="Ballot Name:"
                    data={ballot.ballotName}
                    updateField={updateName}
                />
                <CollapseButton />
            </div>
            {
                !collapsed &&
                <>
                    <button onClick={addRace}>{`Add Race to ${ballotIdentifier}`}</button>
                    {
                        ballot.races.map((race, index) => {
                            return <RaceBuilder
                                key={index}
                                race={race}
                                updateRace={updateRace}
                            />;
                        })
                    }
                </>
            }
        </div>
    );
};

export default BallotBuilder;
