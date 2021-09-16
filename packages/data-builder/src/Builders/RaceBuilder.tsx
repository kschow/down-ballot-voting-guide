import React, { FC } from 'react';
import {
    Candidate,
    generateIssue,
    generateNullCandidate,
    Issue,
    Race
} from '@dbvg/shared-types';
import styles from './Builders.module.scss';
import EditableField from '../Fields/EditableField';
import curriedUpdateAttribute from './Utils/CurriedUpdateAttribute';
import { useIdGenerator } from '../IdContext';
import IssueBuilder from './IssueBuilder';
import CandidateBuilder from './CandidateBuilder';

type RaceBuilderProps = {
    race: Race;
    updateRace: (race: Race) => void;
};

const RaceBuilder: FC<RaceBuilderProps> = ({ race, updateRace }) => {
    const { getNewId } = useIdGenerator();
    const updateValueForAttribute = curriedUpdateAttribute(updateRace)(race);

    const addIssue = () => {
        const issueId = getNewId();
        const newIssue = generateIssue(issueId);

        race.candidates.forEach((candidate) => {
            candidate.positions.push({
                issueId,
                position: null
            });
        });
        updateRace({
            ...race,
            issues: [
                ...race.issues,
                newIssue
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

    const addCandidate = () => {
        const candidateId = getNewId();
        updateRace({
            ...race,
            candidates: [
                ...race.candidates,
                generateNullCandidate(candidateId, race.issues)
            ]
        });
    };

    const updateCandidate = (candidate: Candidate) => {
        const updatedCandidateIndex = race.candidates.findIndex(
            (find) => find.candidateId === candidate.candidateId
        );
        race.candidates.splice(updatedCandidateIndex, 1, candidate);
        updateRace({
            ...race,
            candidates: race.candidates
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
            <div className={styles.multiButton}>
                <button onClick={addIssue}>{`Add Issue to Race #${race.raceId}`}</button>
                <button onClick={addCandidate}>{`Add Candidate to Race #${race.raceId}`}</button>
            </div>
            <div className={styles.internalList}>
                <span>Issues:</span>
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
            <div className={styles.internalList}>
                <span>Candidates:</span>
                {
                    race.candidates.map((candidate) => {
                        return <CandidateBuilder
                            key={candidate.candidateId}
                            candidate={candidate}
                            updateCandidate={updateCandidate}
                            issues={race.issues}
                        />;
                    })
                }
            </div>
        </div>
    );
};

export default RaceBuilder;
