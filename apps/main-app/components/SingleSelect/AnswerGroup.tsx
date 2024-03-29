import { FunctionComponent } from 'react';
import AnswerCard from './AnswerCard';
import singleSelect from './SingleSelect.module.scss';
import { IssuePosition } from '@dbvg/shared-types';

type AnswerGroupProps = {
    selectedAnswer: number;
    setSelectedAnswer(candidateId: number): void;
    backToRaces(): void;
    submitAnswer(): void;
    onLastIssue: boolean;
    issuePositions: IssuePosition[];
}

const AnswerGroup: FunctionComponent<AnswerGroupProps> = ({
    selectedAnswer,
    setSelectedAnswer,
    backToRaces,
    submitAnswer,
    onLastIssue,
    issuePositions
}) => (
    <div className={singleSelect.answerGroup}>
        <strong>Please select one answer below:</strong>
        {
            issuePositions.map((position) => {
                if (position.position) {
                    return <AnswerCard
                        key={position.candidateId}
                        issuePosition={position.position}
                        onClick={(): void => setSelectedAnswer(position.candidateId)}
                        selected={position.candidateId === selectedAnswer}
                    />;
                }
                return null;
            })
        }
        <div className={singleSelect.buttonGroup}>
            <button
                className="link-button"
                onClick={(): void => backToRaces()}
            >
                Back To Races
            </button>
            <button
                className="link-button"
                disabled={selectedAnswer === null}
                onClick={(): void => submitAnswer()}
            >
                { onLastIssue ? 'Finish »' : 'Continue »' }
            </button>
        </div>
    </div>
);

export default AnswerGroup;
