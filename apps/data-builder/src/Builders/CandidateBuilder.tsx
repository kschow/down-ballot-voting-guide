import { Candidate, CandidatePosition, Issue } from '@dbvg/shared-types';
import React, { FC } from 'react';
import curriedUpdateAttribute from './Utils/CurriedUpdateAttribute';
import styles from './Builders.module.scss';
import global from '../Global.module.scss';
import EditableField from '../Fields/EditableField';
import FieldTypes from '../Fields/FieldTypes';
import useCollapsed, { CollapseButtonType } from './UseCollapsed';

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

type CandidateInformationProps = {
    candidate: Candidate;
    updateCandidateAttribute: (attribute: string) => (val: string) => void;
};

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
            <div>
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
                <p className={styles.SubHeader}>Positions:</p>
                <CollapseButton type={CollapseButtonType.IMAGE} />
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
            {
                !collapsed &&
                    <div className={styles.Collapse}>
                        <span />
                        <CollapseButton type={CollapseButtonType.TEXT} />
                    </div>
            }
        </div>
    );
};

const CandidateInformation: FC<CandidateInformationProps> = (props) => {
    const { candidate, updateCandidateAttribute } = props;
    const candidateIdentifier = `Candidate #${candidate.candidateId}`;
    const [collapsed, CollapseButton] = useCollapsed(`${candidateIdentifier} Information`);

    return (
        <div className={styles.InternalList}>
            <div className={styles.Collapse}>
                <p className={styles.SubHeader}>Information:</p>
                <CollapseButton type={CollapseButtonType.IMAGE} />
            </div>
            {
                !collapsed &&
                <>
                    <EditableField
                        type={FieldTypes.TextArea}
                        name={`${candidateIdentifier} Education`}
                        label="Education:"
                        data={candidate.education}
                        updateField={updateCandidateAttribute('education')}
                    />
                    <EditableField
                        type={FieldTypes.Input}
                        name={`${candidateIdentifier} Campaign Website`}
                        label="Campaign Website:"
                        data={candidate.campaignWebsite}
                        updateField={updateCandidateAttribute('campaignWebsite')}
                    />
                    <EditableField
                        type={FieldTypes.Input}
                        name={`${candidateIdentifier} Facebook Page`}
                        label="Facebook Page:"
                        data={candidate.facebook}
                        updateField={updateCandidateAttribute('facebook')}
                    />
                    <EditableField
                        type={FieldTypes.Input}
                        name={`${candidateIdentifier} Twitter Profile`}
                        label="Twitter Profile:"
                        data={candidate.twitter}
                        updateField={updateCandidateAttribute('twitter')}
                    />
                    <EditableField
                        type={FieldTypes.Input}
                        name={`${candidateIdentifier} Video Link`}
                        label="Video Link:"
                        data={candidate.video}
                        updateField={updateCandidateAttribute('video')}
                    />
                    <div className={styles.Collapse}>
                        <span />
                        <CollapseButton type={CollapseButtonType.TEXT} />
                    </div>
                </>
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
                <CollapseButton type={CollapseButtonType.IMAGE} />
            </div>
            {
                !collapsed &&
                <>
                    <CandidateInformation
                        candidate={candidate}
                        updateCandidateAttribute={updateValueForAttribute}
                    />
                    <CandidatePositionList
                        candidate={candidate}
                        updatePosition={updatePosition}
                        issues={issues}
                    />
                    <div className={styles.Collapse}>
                        <span />
                        <CollapseButton type={CollapseButtonType.TEXT} />
                    </div>
                </>
            }
        </div>
    );
};

export default CandidateBuilder;
