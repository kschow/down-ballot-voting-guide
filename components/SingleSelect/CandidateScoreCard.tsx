import React, { FunctionComponent } from 'react';
import { Result } from '../../data/Data';
import singleSelect from './SingleSelect.module.scss';

type CandidateScoreCardProps = {
    candidate: Result;
    isSelected: boolean;
    selectCandidate(): void;
}

const CandidateScoreCard: FunctionComponent<CandidateScoreCardProps> = ({ candidate, isSelected, selectCandidate }) => {
    return (
        <div
            className={`${singleSelect.candidateScoreCard} ${isSelected && singleSelect.selected}`}
            data-testid={candidate.candidateId}
            onClick={selectCandidate}
        >
            <div className={singleSelect.candidateName}>{candidate.candidateName}</div>
        </div>
    );
};

export default CandidateScoreCard;
