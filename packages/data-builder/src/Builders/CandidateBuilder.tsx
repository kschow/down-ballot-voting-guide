import { Candidate, CandidatePosition, Issue } from '@dbvg/shared-types';
import React, { FC } from 'react';
import curriedUpdateAttribute from './Utils/CurriedUpdateAttribute';
import styles from './Builders.module.scss';
import EditableField from '../Fields/EditableField';

type CandidatePositionBuilderProps = {
    candidateId: number;
    position: CandidatePosition;
    question: string;
    updatePosition: (position: CandidatePosition) => void;
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
        <div className={styles.builder}>
            <div><span>Question: {question}</span></div>
            <EditableField
                name={`Position for Candidate #${candidateId} and Issue #${position.issueId}`}
                label="Position:"
                data={position.position}
                updateField={updateCandidatePosition}
            />
        </div>
    );
};

type CandidateBuilderProps = {
    candidate: Candidate;
    updateCandidate: (candidate: Candidate) => void;
    issues: Issue[];
};

const CandidateBuilder: FC<CandidateBuilderProps> = ({ candidate, updateCandidate, issues }) => {
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
        <div className={styles.builder}>
            <EditableField
                name={`Candidate #${candidate.candidateId} Name`}
                label="Candidate Name:"
                data={candidate.candidateName}
                updateField={updateValueForAttribute('candidateName')}
            />
            <div className={styles.internalList}>
                <span>Information:</span>
                <EditableField
                    name={`Candidate #${candidate.candidateId} Education`}
                    label="Education:"
                    data={candidate.education}
                    updateField={updateValueForAttribute('education')}
                />
                <EditableField
                    name={`Candidate #${candidate.candidateId} Campaign Website`}
                    label="Campaign Website:"
                    data={candidate.campaignWebsite}
                    updateField={updateValueForAttribute('campaignWebsite')}
                />
                <EditableField
                    name={`Candidate #${candidate.candidateId} Facebook Page`}
                    label="Facebook Page:"
                    data={candidate.facebook}
                    updateField={updateValueForAttribute('facebook')}
                />
                <EditableField
                    name={`Candidate #${candidate.candidateId} Twitter Profile`}
                    label="Twitter Profile:"
                    data={candidate.twitter}
                    updateField={updateValueForAttribute('twitter')}
                />
                <EditableField
                    name={`Candidate #${candidate.candidateId} Video Link`}
                    label="Video Link:"
                    data={candidate.video}
                    updateField={updateValueForAttribute('video')}
                />
            </div>
            <div className={styles.internalList}>
                <span>Positions:</span>
                {
                    candidate.positions.map((position) => {
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
        </div>
    );
};

export default CandidateBuilder;
