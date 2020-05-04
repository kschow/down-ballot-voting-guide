import * as PropTypes from 'prop-types';
import React from 'react';
import singleSelect from './SingleSelect.module.scss';

const AnswerCard = ({ issuePosition, onClick, selected }) => (
    <div
        // eslint-disable-next-line multiline-ternary
        className={`${singleSelect.answerCard} ${selected ? singleSelect.selected : ''}`}
        onClick={onClick}
    >
        {issuePosition}
    </div>
);

AnswerCard.propTypes = {
    issuePosition: PropTypes.string,
    onClick: PropTypes.func,
    selected: PropTypes.bool
};

export default AnswerCard;
