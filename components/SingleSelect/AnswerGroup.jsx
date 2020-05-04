import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import AnswerCard from './AnswerCard';
import singleSelect from './SingleSelect.module.scss';

const AnswerGroup = ({ issuePositions }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const selectAnswer = (candidateId) => {
        setSelectedAnswer(candidateId);
    };

    return (
        <div className={singleSelect.answerGroup}>
            <strong>Please select one answer below:</strong>
            {
                issuePositions.map((position) => {
                    if (position.position) {
                        return <AnswerCard
                            key={position.candidateId}
                            issuePosition={position.position}
                            onClick={() => selectAnswer(position.candidateId)}
                            selected={position.candidateId === selectedAnswer}
                        />;
                    }
                    return null;
                })
            }
        </div>
    );
};

AnswerGroup.propTypes = {
    issuePositions: PropTypes.arrayOf(PropTypes.object)
};

export default AnswerGroup;
