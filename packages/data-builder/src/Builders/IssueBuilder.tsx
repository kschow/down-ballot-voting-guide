import { Issue } from '@dbvg/shared-types';
import React, { FC } from 'react';
import styles from './Builders.module.scss';
import EditableField from '../Fields/EditableField';
import curriedUpdateAttribute from './Utils/CurriedUpdateAttribute';
import FieldTypes from '../Fields/FieldTypes';

type IssueBuilderProps = {
    issue: Issue;
    updateIssue: (issue: Issue) => void;
};

const IssueBuilder: FC<IssueBuilderProps> = ({ issue, updateIssue }) => {
    const updateValueForAttribute = curriedUpdateAttribute(updateIssue)(issue);
    return (
        <div className={styles.builder}>
            <EditableField
                type={FieldTypes.Input}
                name={`Issue #${issue.issueId} Name`}
                label="Issue Name:"
                data={issue.issueName}
                updateField={updateValueForAttribute('issueName')}
            />
            <EditableField
                type={FieldTypes.TextArea}
                name={`Issue #${issue.issueId} Question`}
                label="Issue Question:"
                data={issue.question}
                updateField={updateValueForAttribute('question')}
            />
        </div>
    );
};

export default IssueBuilder;
