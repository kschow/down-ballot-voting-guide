import * as PropTypes from 'prop-types';
import React from 'react';
import global from './Global.module.scss';

const IssueCard = ({ issueName, question }) => (
    <div className={global.card}>
        <div className={global.title}>
            <strong>{issueName}:</strong>
        </div>
        {question}
    </div>
);

IssueCard.propTypes = {
    issueName: PropTypes.string,
    question: PropTypes.string
};

export default IssueCard;
