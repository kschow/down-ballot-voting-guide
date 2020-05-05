import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ElectedOfficialCard from '../Shared/ElectedOfficialCard';
import IssueCard from '../Shared/IssueCard';
import AnswerGroup from './AnswerGroup';

const RaceGuide = ({ guide, updatePageTitle }) => {
    const [issuePositions, setIssuePositions] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        setIssuePositions(guide.getNextIssuePositions());
    }, []);

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
        setSelectedAnswer(null);
    };

    if (issuePositions) {
        updatePageTitle(issuePositions.issueName);
    }

    return (
        <div>
            <ElectedOfficialCard
                name={guide.race.raceName}
                description={guide.race.description}
            />
            {
                issuePositions &&
                    <>
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
                    </>
            }
        </div>
    );
};

RaceGuide.propTypes = {
    guide: PropTypes.object,
    updatePageTitle: PropTypes.func
};

export default RaceGuide;
