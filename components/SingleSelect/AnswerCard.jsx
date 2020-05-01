import * as PropTypes from 'prop-types';
import React from 'react';
import singleSelect from './SingleSelect.module.scss';

const AnswerCard = ({ issuePosition, selected }) => (
    // eslint-disable-next-line multiline-ternary
    <div className={`${singleSelect.answerCard} ${selected ? singleSelect.selected : ''}`}>
        {issuePosition}
    </div>
);

AnswerCard.propTypes = {
    issuePosition: PropTypes.string,
    selected: PropTypes.bool
};

export default AnswerCard;
