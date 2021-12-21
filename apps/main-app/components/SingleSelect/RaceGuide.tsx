import { FunctionComponent, useEffect, useRef, useState } from 'react';
import ElectedOfficialCard from '../Shared/ElectedOfficialCard';
import IssueCard from '../Shared/IssueCard';
import AnswerGroup from './AnswerGroup';
import Guide from '../../data/Guide';
import { IssuePositions } from '@dbvg/shared-types';

type RaceGuideProps = {
    guide: Guide;
    updatePageTitle(string): void;
    finishRace(): void;
}

const RaceGuide: FunctionComponent<RaceGuideProps> = ({ guide, updatePageTitle, finishRace }) => {
    const issueRef = useRef(null);
    const [isFirstIssue, setIsFirstIssue] = useState(true);
    const [issuePositions, setIssuePositions] = useState(null as IssuePositions);
    const [selectedAnswer, setSelectedAnswer] = useState(null as number);

    useEffect(() => {
        setIssuePositions(guide.getNextIssuePositions());
    }, [guide]);

    const submitAnswer = (): void => {
        if (selectedAnswer === null) {
            throw new Error('Cannot submit an answer without a selected answer');
        }
        const candidateUpdates = issuePositions.positions.map((position) => {
            return {
                candidateId: position.candidateId,
                score: selectedAnswer === position.candidateId ? 1 : 0
            };
        });
        const update = {
            issueId: issuePositions.issueId,
            candidates: candidateUpdates
        };
        guide.updateScore(update);

        if (guide.onLastIssue()) {
            finishRace();
        }
        setIssuePositions(guide.getNextIssuePositions());
        setIsFirstIssue(false);
        setSelectedAnswer(null);
    };

    useEffect(() => {
        if (issuePositions) {
            updatePageTitle(issuePositions.issueName);
        }
    }, [updatePageTitle, issuePositions]);

    useEffect(() => {
        if (issueRef.current && !isFirstIssue) {
            issueRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isFirstIssue, issuePositions, issueRef]);

    return (
        <div>
            <ElectedOfficialCard
                name={guide.race.raceName}
                description={guide.race.description}
            />
            {
                issuePositions &&
                    <div ref={issueRef}>
                        <IssueCard
                            issueName={issuePositions.issueName}
                            question={issuePositions.question}
                        />
                        <AnswerGroup
                            selectedAnswer={selectedAnswer}
                            setSelectedAnswer={setSelectedAnswer}
                            submitAnswer={submitAnswer}
                            onLastIssue={guide.onLastIssue()}
                            issuePositions={issuePositions.positions}
                        />
                    </div>
            }
        </div>
    );
};

export default RaceGuide;
