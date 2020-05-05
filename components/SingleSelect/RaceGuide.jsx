import * as PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ElectedOfficialCard from '../Shared/ElectedOfficialCard';
import IssueCard from '../Shared/IssueCard';
import AnswerGroup from './AnswerGroup';

const RaceGuide = ({ guide, updatePageTitle }) => {
    const issueRef = useRef(null);
    const [isFirstIssue, setIsFirstIssue] = useState(true);
    const [issuePositions, setIssuePositions] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        setIssuePositions(guide.getNextIssuePositions());
    }, [guide]);

    const submitAnswer = () => {
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

RaceGuide.propTypes = {
    guide: PropTypes.object,
    updatePageTitle: PropTypes.func
};

export default RaceGuide;
