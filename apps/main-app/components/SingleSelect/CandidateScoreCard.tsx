import React, { FunctionComponent } from 'react';
import { CandidateIssueResult, Result } from '../../data/Scoring';
import singleSelect from './SingleSelect.module.scss';
import global from '../Shared/Global.module.scss';

const CandidatePosition: FunctionComponent<CandidateIssueResult> = ({ issueName, position, score }) => {
    return (
        <div className={`${singleSelect.issue} ${score && singleSelect.selected}`}>
            <details>
                <summary className={singleSelect.issueName}>
                    {issueName} {score > 0 && <span className={global.srOnly}>(selected)</span>}
                </summary>
                <span>{ position }</span>
            </details>
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
            <button onClick={selectCandidate}>
                <h2 className={singleSelect.candidateName}>
                    {candidate.candidateName}
                    {isSelected && <span className={global.srOnly}>(selected)</span>}
                </h2>
            </button>
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
