import { Candidate, CandidatePosition, Issue } from '@dbvg/shared-types';
import React, { FC } from 'react';
import curriedUpdateAttribute from './Utils/CurriedUpdateAttribute';
import styles from './Builders.module.scss';
import global from '../Global.module.scss';
import EditableField from '../Fields/EditableField';
import FieldTypes from '../Fields/FieldTypes';
import useCollapsed from './UseCollapsed';

type CandidatePositionBuilderProps = {
    candidateId: number;
    position: CandidatePosition;
    question: string;
    updatePosition: (position: CandidatePosition) => void;
};

type CandidatePositionList = {
    candidate: Candidate;
    updatePosition: (position: CandidatePosition) => void;
    issues: Issue[];
}

type CandidateBuilderProps = {
    candidate: Candidate;
    updateCandidate: (candidate: Candidate) => void;
    issues: Issue[];
};

const CandidatePositionBuilder: FC<CandidatePositionBuilderProps> = (props) => {
    const { candidateId, position, question, updatePosition } = props;

    const updateCandidatePosition = (newPosition: string) => {
        updatePosition({
            ...position,
            position: newPosition
        });
    };

    return (
        <div className={styles.Builder}>
            <div className={styles.stacked}>
                <p className={global.label}>Question: </p>
                <p>{question}</p>
            </div>
            <EditableField
                type={FieldTypes.TextArea}
                name={`Position for Candidate #${candidateId} and Issue #${position.issueId}`}
                label="Position:"
                data={position.position}
                updateField={updateCandidatePosition}
            />
        </div>
    );
};

const CandidatePositionList: FC<CandidatePositionList> = (props) => {
    const { candidate, updatePosition, issues } = props;
    const [collapsed, CollapseButton] = useCollapsed(`Candidate #${candidate.candidateId} Positions`);

    return (
        <div className={styles.InternalList}>
            <div className={styles.Collapse}>
                <p>Positions:</p>
                <CollapseButton />
            </div>
            {
                !collapsed && candidate.positions.map((position) => {
                    const questionForPosition =
                        issues.find((issue) => issue.issueId === position.issueId).question;
                    return <CandidatePositionBuilder
                        key={position.issueId}
                        candidateId={candidate.candidateId}
                        position={position}
                        question={questionForPosition}
                        updatePosition={updatePosition}
                    />;
                })
            }
        </div>
    );
};

const CandidateBuilder: FC<CandidateBuilderProps> = ({ candidate, updateCandidate, issues }) => {
    const candidateIdentifier = `Candidate #${candidate.candidateId}`;
    const [collapsed, CollapseButton] = useCollapsed(candidateIdentifier);
    const updateValueForAttribute = curriedUpdateAttribute(updateCandidate)(candidate);

    const updatePosition = (position: CandidatePosition) => {
        const updatedIndex = candidate.positions.findIndex((pos) => pos.issueId === position.issueId);
        candidate.positions.splice(updatedIndex, 1, position);
        updateCandidate({
            ...candidate,
            positions: candidate.positions
        });
    };

    return (
        <div className={styles.Builder}>
            <div className={styles.Collapse}>
                <EditableField
                    type={FieldTypes.Input}
                    name={`${candidateIdentifier} Name`}
                    label="Candidate Name:"
                    data={candidate.candidateName}
                    updateField={updateValueForAttribute('candidateName')}
                />
                <CollapseButton />
            </div>
            {
                !collapsed &&
                <>
                    <div className={styles.InternalList}>
                        <p>Information:</p>
                        <EditableField
                            type={FieldTypes.TextArea}
                            name={`${candidateIdentifier} Education`}
                            label="Education:"
                            data={candidate.education}
                            updateField={updateValueForAttribute('education')}
                        />
                        <EditableField
                            type={FieldTypes.Input}
                            name={`${candidateIdentifier} Campaign Website`}
                            label="Campaign Website:"
                            data={candidate.campaignWebsite}
                            updateField={updateValueForAttribute('campaignWebsite')}
                        />
                        <EditableField
                            type={FieldTypes.Input}
                            name={`${candidateIdentifier} Facebook Page`}
                            label="Facebook Page:"
                            data={candidate.facebook}
                            updateField={updateValueForAttribute('facebook')}
                        />
                        <EditableField
                            type={FieldTypes.Input}
                            name={`${candidateIdentifier} Twitter Profile`}
                            label="Twitter Profile:"
                            data={candidate.twitter}
                            updateField={updateValueForAttribute('twitter')}
                        />
                        <EditableField
                            type={FieldTypes.Input}
                            name={`${candidateIdentifier} Video Link`}
                            label="Video Link:"
                            data={candidate.video}
                            updateField={updateValueForAttribute('video')}
                        />
                    </div>
                    <CandidatePositionList
                        candidate={candidate}
                        updatePosition={updatePosition}
                        issues={issues}
                    />
                </>
            }
        </div>
    );
};

export default CandidateBuilder;
