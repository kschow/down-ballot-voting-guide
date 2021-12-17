import { Issue } from '@dbvg/shared-types';
import React, { FC } from 'react';
import styles from './Builders.module.scss';
import EditableField from '../Fields/EditableField';
import curriedUpdateAttribute from './Utils/CurriedUpdateAttribute';
import FieldTypes from '../Fields/FieldTypes';
import useDelete from './UseDelete';

type IssueBuilderProps = {
    issue: Issue;
    updateIssue: (issue: Issue) => void;
    deleteIssue: (issue: Issue) => void;
};

const IssueBuilder: FC<IssueBuilderProps> = ({ issue, updateIssue, deleteIssue }) => {
    const issueIdentifier = `Issue #${issue.issueId}`;
    const updateValueForAttribute = curriedUpdateAttribute(updateIssue)(issue);
    const [DeleteModal, DeleteButton] =
        useDelete(issueIdentifier, issue.issueName, () => deleteIssue(issue));

    return (
        <div className={styles.Builder}>
            <div className={styles.SplitWide}>
                <EditableField
                    type={FieldTypes.Input}
                    name={`${issueIdentifier} Name`}
                    label="Issue Name:"
                    data={issue.issueName}
                    updateField={updateValueForAttribute('issueName')}
                />
                <div>
                    <DeleteModal />
                    <DeleteButton />
                </div>
            </div>
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
