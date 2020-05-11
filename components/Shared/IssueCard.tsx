import React, { FunctionComponent } from 'react';
import global from './Global.module.scss';

type IssueCardProps = {
    issueName: string;
    question: string;
}

const IssueCard: FunctionComponent<IssueCardProps> = ({ issueName, question }: IssueCardProps) => (
    <div className={global.card}>
        <div className={global.title}>
            <strong>{issueName}:</strong>
        </div>
        {question}
    </div>
);

export default IssueCard;
