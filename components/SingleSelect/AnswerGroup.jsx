import * as PropTypes from 'prop-types';
import React from 'react';
import AnswerCard from './AnswerCard';
import singleSelect from './SingleSelect.module.scss';

const AnswerGroup = ({
    selectedAnswer,
    setSelectedAnswer,
    submitAnswer,
    issuePositions
}) => (
    <div className={singleSelect.answerGroup}>
        <strong>Please select one answer below:</strong>
        {
            issuePositions.map((position) => {
                if (position.position) {
                    return <AnswerCard
                        key={position.candidateId}
                        issuePosition={position.position}
                        onClick={() => setSelectedAnswer(position.candidateId)}
                        selected={position.candidateId === selectedAnswer}
                    />;
                }
                return null;
            })
        }
        <div className={singleSelect.continueContainer}>
            <button
                className="link-button"
                disabled={selectedAnswer === null}
                onClick={() => submitAnswer()}
            >
                    Continue &raquo;
            </button>
        </div>
    </div>
);

AnswerGroup.propTypes = {
    selectedAnswer: PropTypes.number,
    setSelectedAnswer: PropTypes.func,
    submitAnswer: PropTypes.func,
    issuePositions: PropTypes.arrayOf(PropTypes.object)
};

export default AnswerGroup;
