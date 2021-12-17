import React, { FC, useEffect, useState } from 'react';
import { Ballot, Election, generateBallot } from '@dbvg/shared-types';
import BallotBuilder from './BallotBuilder';
import { useIdGenerator } from './IdContext';
import styles from './Builders.module.scss';
import EditableField from '../Fields/EditableField';
import FieldTypes from '../Fields/FieldTypes';
import useCollapsed, { CollapseButtonType } from './UseCollapsed';
import { saveAs } from 'file-saver';

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

    const deleteBallot = (ballot: Ballot) => {
        const deletedBallotIndex = electionInfo.ballots.findIndex((find) => find.ballotId === ballot.ballotId);
        electionInfo.ballots.splice(deletedBallotIndex, 1);
        setElectionInfo({
            ...electionInfo,
            ballots: electionInfo.ballots
        });
    };

    const saveToJson = () => {
        const prettifiedElection = JSON.stringify(electionInfo, null, 2);
        const electionFile =
            new File([prettifiedElection], `${electionInfo.electionName}.json`, { type: 'application/json' });
        saveAs(electionFile);
    };

    return (
        <div className={`${styles.Builder} ${styles.Election}`}>
            <div className={styles.SplitWide}>
                <EditableField
                    type={FieldTypes.Input}
                    name="Election Name"
                    label="Election Name:"
                    data={electionInfo.electionName}
                    updateField={updateName}
                />
                <CollapseButton type={CollapseButtonType.IMAGE} />
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
                                    deleteBallot={deleteBallot}
                                />;
                            })
                        }
                    </div>
                </>
            }
            <div className={styles.SaveButton}>
                <button onClick={saveToJson}>Save File</button>
            </div>
        </div>
    );
};

export default ElectionBuilder;
