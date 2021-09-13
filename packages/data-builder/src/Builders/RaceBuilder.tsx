import React, { FC } from 'react';
import { generateIssue, Issue, Race } from '@dbvg/shared-types';
import styles from './Builders.module.scss';
import EditableField from '../Fields/EditableField';
import curriedUpdateAttribute from './Utils/CurriedUpdateAttribute';
import { useIdGenerator } from '../IdContext';
import IssueBuilder from './IssueBuilder';

type RaceBuilderProps = {
    race: Race;
    updateRace: (race: Race) => void;
};

const RaceBuilder: FC<RaceBuilderProps> = ({ race, updateRace }) => {
    const { getNewId } = useIdGenerator();
    const updateValueForAttribute = curriedUpdateAttribute(updateRace)(race);

    const addIssue = () => {
        const issueId = getNewId();
        updateRace({
            ...race,
            issues: [
                ...race.issues,
                generateIssue(issueId)
            ]
        });
    };

    const updateIssue = (issue: Issue) => {
        const updatedIssueIndex = race.issues.findIndex((find) => find.issueId === issue.issueId);
        race.issues.splice(updatedIssueIndex, 1, issue);
        updateRace({
            ...race,
            issues: race.issues
        });
    };

    return (
        <div className={styles.builder}>
            <EditableField
                name={`Race #${race.raceId} Name`}
                label="Race Name:"
                data={race.raceName}
                updateField={updateValueForAttribute('raceName')}
            />
            <EditableField
                name={`Race #${race.raceId} Description`}
                label="Position Description:"
                data={race.description}
                updateField={updateValueForAttribute('description')}
            />
            <div>
                <button onClick={addIssue}>{`Add Issue to Race #${race.raceId}`}</button>
                {
                    race.issues.map((issue) => {
                        return <IssueBuilder
                            key={issue.issueId}
                            issue={issue}
                            updateIssue={updateIssue}
                        />;
                    })
                }
            </div>
        </div>
    );
};

export default RaceBuilder;
