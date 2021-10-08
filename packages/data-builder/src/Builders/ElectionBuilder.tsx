import React, { FC, useEffect, useState } from 'react';
import { Election, Ballot, generateBallot } from '@dbvg/shared-types';
import BallotBuilder from './BallotBuilder';
import { useIdGenerator } from './IdContext';
import styles from './Builders.module.scss';
import EditableField from '../Fields/EditableField';
import FieldTypes from '../Fields/FieldTypes';
import useCollapsed from './UseCollapsed';

type ElectionBuilderProps = {
    election?: Election;
}

const createNewElection = () => {
    return {
        electionName: '',
        ballots: []
    } as Election;
};

const ElectionBuilder:FC<ElectionBuilderProps> = ({ election }) => {
    const { getNewId } = useIdGenerator();
    const [electionInfo, setElectionInfo] = useState(election ? election : createNewElection());
    const [collapsed, CollapseButton] = useCollapsed('election');

    useEffect(() => {
        localStorage.setItem('election', JSON.stringify(electionInfo));
    }, [electionInfo]);

    const updateName = (electionName: string) => {
        setElectionInfo({
            ...electionInfo,
            electionName
        });
    };

    const addBallot = () => {
        const ballotId = getNewId();
        const newBallots = [
            ...electionInfo.ballots,
            generateBallot(ballotId)
        ];
        setElectionInfo({
            ...electionInfo,
            ballots: newBallots
        });
    };

    const updateBallot = (ballot: Ballot) => {
        const updatedBallotIndex = electionInfo.ballots.findIndex((find) => find.ballotId === ballot.ballotId);
        electionInfo.ballots.splice(updatedBallotIndex, 1, ballot);
        setElectionInfo({
            ...electionInfo,
            ballots: electionInfo.ballots
        });
    };

    return (
        <div className={`${styles.Builder} ${styles.Election}`}>
            <div className={styles.Collapse}>
                <EditableField
                    type={FieldTypes.Input}
                    name="Election Name"
                    label="Election Name:"
                    data={electionInfo.electionName}
                    updateField={updateName}
                />
                <CollapseButton />
            </div>
            {
                !collapsed &&
                <>
                    <button onClick={addBallot}>Add Ballot</button>
                    <div id="ballots">
                        {
                            electionInfo.ballots.map((ballot, index) => {
                                return <BallotBuilder
                                    key={index}
                                    ballot={ballot}
                                    updateBallot={updateBallot}
                                />;
                            })
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default ElectionBuilder;
