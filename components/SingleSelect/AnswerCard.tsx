import React, { FunctionComponent } from 'react';
import singleSelect from './SingleSelect.module.scss';

type AnswerCardProps = {
    issuePosition: string;
    selected: boolean;
    onClick?(): void;
}

const AnswerCard: FunctionComponent<AnswerCardProps> = ({ issuePosition, onClick, selected }: AnswerCardProps) => (
    <div
        // eslint-disable-next-line multiline-ternary
        className={`${singleSelect.answerCard} ${selected ? singleSelect.selected : ''}`}
        onClick={onClick}
    >
        {issuePosition}
    </div>
);

export default AnswerCard;
