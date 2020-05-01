import React from 'react';
import global from '../Global.module.scss';
import singleSelect from './SingleSelect.module.scss';

const Description = () => {
    return (
        <>
            <div>
                For this guide, you will be asked to select exactly one answer
                out of a set of answers for a specific question asked of candidates.
                The question will be placed at the top of the page like so:
            </div>
            <div className={global.card}>
                <strong>Background:</strong><br/>
                What training, experience, and background qualify you for this position?
            </div>
            <div>
                Answers to this question will be placed like so:
            </div>
            <div className={singleSelect.answerCard}>
                I’m a 54 yr old native Texan, husband, father, business owner, w/ a deep historical knowledge
                of the office of U.S. Senator. I’m in construction & the oilfield. I’ve traded construction equipment
                internationally since the 90s & have a solid grasp of monetary policy. I have firsthand experience of
                what that policy does to US Citizens as well as to other countries’ economies.
            </div>
            <div>
                When selected, an answer will look like this:
            </div>
            <div className={`${singleSelect.answerCard} ${singleSelect.selected}`}>
                For the last four years I have represented 2.3 million Texans as a Houston City Council Member, where I
                spearheaded efforts on Hurricane Harvey recovery and technology & innovation, and oversaw a
                multi-billion dollar budget. Prior to public service I practiced as a municipal finance lawyer,
                and was involved in numerous non-profit activities. My focus is achieving results.
            </div>
        </>
    );
};

export default Description;
