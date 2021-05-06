import React, { FunctionComponent } from 'react';
import ElectedOfficialCard from '../Shared/ElectedOfficialCard';
import IssueCard from '../Shared/IssueCard';
import AnswerCard from './AnswerCard';

const electedOfficial = {
    name: 'US Senator',
    description:
        'Six-year term. One of two members of the U.S. Senate from Texas. The Senate has the exclusive ' +
        'power to advise and consent on presidential nominations to executive and judicial offices, to ' +
        'ratify U.S. treaties, and to try impeachments. With the U.S. House, the Senate adopts budgets, ' +
        'levies taxes, borrows money, regulates interstate commerce, provides services, adopts regulations, ' +
        'and declares war. Current annual salary: $174,000'
};

const issue = {
    issueName: 'Background',
    question: 'What training, experience, and background qualify you for this position?'
};

const answerOne = {
    issuePosition:
        'I’m a 54 yr old native Texan, husband, father, business owner, w/ a deep historical ' +
        'knowledge of the office of U.S. Senator. I’m in construction & the oilfield. I’ve traded ' +
        'construction equipment internationally since the 90s & have a solid grasp of monetary ' +
        'policy. I have firsthand experience of what that policy does to US Citizens as well as ' +
        'to other countries’ economies.',
    selected: false
};

const answerTwo = {
    issuePosition:
        'For the last four years I have represented 2.3 million Texans as a Houston City Council Member, ' +
        'where I spearheaded efforts on Hurricane Harvey recovery and technology & innovation, and ' +
        'oversaw a multi-billion dollar budget. Prior to public service I practiced as a municipal ' +
        'finance lawyer, and was involved in numerous non-profit activities. My focus is achieving results.',
    selected: true
};

const Description: FunctionComponent = () => {
    return (
        <>
            <div>
                At the top of this guide will be the name and description of the position you are deciding on.
                It will be shown like so:
            </div>
            <ElectedOfficialCard
                name={electedOfficial.name}
                description={electedOfficial.description}
            />
            <div>
                Next, you will be asked to select exactly one answer
                out of a set of answers for a specific question asked of candidates.
                The question will be placed at the top of the page like so:
            </div>
            <IssueCard
                issueName={issue.issueName}
                question={issue.question}
            />
            <div>
                Answers to this question will be placed like so:
            </div>
            <AnswerCard
                issuePosition={answerOne.issuePosition}
                selected={answerOne.selected}
            />
            <div>
                To select an answer, click or tap on the answer you want to choose.
                When selected, an answer will look like this:
            </div>
            <AnswerCard
                issuePosition={answerTwo.issuePosition}
                selected={answerTwo.selected}
            />
        </>
    );
};

export default Description;
