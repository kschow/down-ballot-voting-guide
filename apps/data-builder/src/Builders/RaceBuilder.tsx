import { FC } from 'react';
import { Candidate, generateIssue, generateNullCandidate, Issue, Race } from '@dbvg/shared-types';
import styles from './Builders.module.scss';
import EditableField from '../Fields/EditableField';
import curriedUpdateAttribute from './Utils/CurriedUpdateAttribute';
import { useIdGenerator } from './IdContext';
import IssueBuilder from './IssueBuilder';
import CandidateBuilder from './CandidateBuilder';
import FieldTypes from '../Fields/FieldTypes';
import useCollapsed, { CollapseButtonType } from './UseCollapsed';
import useDelete from './UseDelete';

type IssueListProps = {
    race: Race;
    updateIssue: (issue: Issue) => void;
    deleteIssue: (issue: Issue) => void;
}

type CandidateListProps = {
    race: Race;
    updateCandidate: (candidate: Candidate) => void;
    deleteCandidate: (candidate: Candidate) => void;
}

type RaceBuilderProps = {
    race: Race;
    updateRace: (race: Race) => void;
    deleteRace: (race: Race) => void;
};

const IssueList:FC<IssueListProps> = ({ race, updateIssue, deleteIssue }) => {
    const [collapsed, CollapseButton] = useCollapsed(`Race #${race.raceId} Issues`);
    return (
        <div className={styles.InternalList}>
            <div className={styles.SplitWide}>
                <span className={styles.SubHeader}>Issues:</span>
                <CollapseButton type={CollapseButtonType.IMAGE } />
            </div>
            {
                !collapsed && race.issues.map((issue) => {
                    return <IssueBuilder
                        key={issue.issueId}
                        issue={issue}
                        updateIssue={updateIssue}
                        deleteIssue={deleteIssue}
                    />;
                })
            }
            {
                !collapsed &&
                    <div className={styles.SplitWide}>
                        <span />
                        <CollapseButton type={CollapseButtonType.TEXT} />
                    </div>
            }
        </div>
    );
};

const CandidateList:FC<CandidateListProps> = ({ race, updateCandidate, deleteCandidate }) => {
    const [collapsed, CollapseButton] = useCollapsed(`Race #${race.raceId} Candidates`);
    return (
        <div className={styles.InternalList}>
            <div className={styles.SplitWide}>
                <span className={styles.SubHeader}>Candidates:</span>
                <CollapseButton type={CollapseButtonType.IMAGE} />
            </div>
            {
                !collapsed && race.candidates.map((candidate) => {
                    return <CandidateBuilder
                        key={candidate.candidateId}
                        candidate={candidate}
                        updateCandidate={updateCandidate}
                        deleteCandidate={deleteCandidate}
                        issues={race.issues}
                    />;
                })
            }
            {
                !collapsed &&
                    <div className={styles.SplitWide}>
                        <span />
                        <CollapseButton type={CollapseButtonType.TEXT} />
                    </div>
            }
        </div>
    );
};

const RaceBuilder: FC<RaceBuilderProps> = ({ race, updateRace, deleteRace }) => {
    const { getNewId } = useIdGenerator();
    const raceIdentifier = `Race #${race.raceId}`;
    const [collapsed, CollapseButton] = useCollapsed(raceIdentifier);
    const updateValueForAttribute = curriedUpdateAttribute(updateRace)(race);
    const [DeleteModal, DeleteButton] =
        useDelete(raceIdentifier,
            race.raceName,
            () => deleteRace(race));

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

    const deleteIssue = (issue: Issue) => {
        const deletedIssueIndex = race.issues.findIndex((find) => find.issueId === issue.issueId);
        race.issues.splice(deletedIssueIndex, 1);
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

    const deleteCandidate = (candidate: Candidate) => {
        const deletedCandidateIndex = race.candidates.findIndex(
            (find) => find.candidateId === candidate.candidateId
        );
        race.candidates.splice(deletedCandidateIndex, 1);
        updateRace({
            ...race,
            candidates: race.candidates
        });
    };

    const addButtons = () => {
        return (
            <div className={styles.MultiButton}>
                <button onClick={addIssue}>{`Add Issue to ${raceIdentifier}`}</button>
                <button onClick={addCandidate}>{`Add Candidate to ${raceIdentifier}`}</button>
            </div>
        );
    };

    return (
        <div className={styles.Builder}>
            <div className={styles.SplitWide}>
                <EditableField
                    type={FieldTypes.Input}
                    name={`${raceIdentifier} Name`}
                    label="Race Name:"
                    data={race.raceName}
                    updateField={updateValueForAttribute('raceName')}
                />
                <div>
                    <DeleteModal />
                    <DeleteButton />
                    <CollapseButton type={CollapseButtonType.IMAGE} />
                </div>
            </div>

            {
                !collapsed &&
                <>
                    <EditableField
                        type={FieldTypes.TextArea}
                        name={`${raceIdentifier} Description`}
                        label="Position Description:"
                        data={race.description}
                        updateField={updateValueForAttribute('description')}
                    />
                    <EditableField
                        type={FieldTypes.CountySelect}
                        name={`${raceIdentifier} County`}
                        label="County:"
                        data={race.county}
                        updateField={updateValueForAttribute('county')}
                    />
                    <EditableField
                        type={FieldTypes.ArrayArea}
                        name={`${raceIdentifier} Precincts`}
                        label="Precincts:"
                        data={race.precincts}
                        updateField={updateValueForAttribute('precincts')}
                    />
                    { addButtons() }
                    <IssueList race={race} updateIssue={updateIssue} deleteIssue={deleteIssue} />
                    <CandidateList
                        race={race}
                        updateCandidate={updateCandidate}
                        deleteCandidate={deleteCandidate}
                    />
                    {
                        (race.issues.length > 0 || race.candidates.length > 0) &&
                            <div className={styles.SplitWide}>
                                { addButtons() }
                                { <CollapseButton type={CollapseButtonType.TEXT} /> }
                            </div>
                    }
                </>
            }
        </div>
    );
};

export default RaceBuilder;
