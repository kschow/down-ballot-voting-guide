import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Guide from '../../data/Guide';
import ElectedOfficialCard from '../Shared/ElectedOfficialCard';
import IssueCard from '../Shared/IssueCard';
import AnswerCard from './AnswerCard';

const RaceGuide = ({ race, issueOrder, shufflePositions }) => {
    // eslint-disable-next-line no-unused-vars
    const [guide, setGuide] = useState(null);
    const [issuePositions, setIssuePositions] = useState(null);

    useEffect(() => {
        const newGuide = new Guide(race, issueOrder, shufflePositions);
        setGuide(newGuide);
        setIssuePositions(newGuide.getNextIssuePositions());
    }, []);

    return (
        <div>
            <ElectedOfficialCard
                name={race.raceName}
                description={race.description}
            />
            {
                issuePositions &&
                    <>
                        <IssueCard
                            issueName={issuePositions.issueName}
                            question={issuePositions.question}
                        />
                        {
                            issuePositions.positions.map((position) => {
                                if (position.position) {
                                    return <AnswerCard
                                        key={position.candidateId}
                                        issuePosition={position.position}
                                        selected={false}
                                    />;
                                }
                                return null;
                            })
                        }
                    </>
            }
        </div>
    );
};

RaceGuide.propTypes = {
    race: PropTypes.object,
    issueOrder: PropTypes.arrayOf(PropTypes.number),
    shufflePositions: PropTypes.bool
};

export default RaceGuide;
