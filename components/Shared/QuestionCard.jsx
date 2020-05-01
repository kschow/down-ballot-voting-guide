import * as PropTypes from 'prop-types';
import React from 'react';
import global from '../Global.module.scss';

const QuestionCard = ({ issueName, question }) => (
    <div className={global.card}>
        <div className={global.title}>
            <strong>{issueName}:</strong>
        </div>
        {question}
    </div>
);

QuestionCard.propTypes = {
    issueName: PropTypes.string,
    question: PropTypes.string
};

export default QuestionCard;
