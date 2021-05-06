import React, { FunctionComponent, useState } from 'react';
import { CandidateIssueResult, Result } from '../../data/Scoring';
import singleSelect from './SingleSelect.module.scss';
import DownArrow from '../Icons/DownArrow';
import UpArrow from '../Icons/UpArrow';

const CandidatePosition: FunctionComponent<CandidateIssueResult> = ({ issueName, position, score }) => {
    const [displayPosition, setDisplayPosition] = useState(false);

    const toggleDisplayPosition = (): void => {
        setDisplayPosition(!displayPosition);
    };

    return (
        <div
            className={`${singleSelect.issue} ${score && singleSelect.selected}`}
            onClick={(): void => toggleDisplayPosition()}
        >
            <div className={singleSelect.issueName}>
                <div>{issueName}</div>
                {
                    displayPosition ? <UpArrow /> : <DownArrow />
                }
            </div>
            <div>
                { displayPosition && position }
            </div>
        </div>
    );
};

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
        >
            <div
                className={singleSelect.candidateName}
                onClick={selectCandidate}
            >
                {candidate.candidateName}
            </div>
            {
                candidate.issues.map((issue) => {
                    return (
                        <CandidatePosition
                            issueName={issue.issueName}
                            position={issue.position}
                            score={issue.score}
                            key={`${candidate.candidateId}-${issue.issueName}`}
                        />
                    );
                })
            }
        </div>
    );
};

export default CandidateScoreCard;
