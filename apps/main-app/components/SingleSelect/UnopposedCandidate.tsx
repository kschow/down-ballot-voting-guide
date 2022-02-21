import { Candidate } from '@dbvg/shared-types';
import singleSelect from './SingleSelect.module.scss';
import global from '../Shared/Global.module.scss';
import { FC, useState } from 'react';

type UnopposedCandidateProps = {
    candidate: Candidate;
    backToRaces(candidateId: number, force?: boolean): void;
}

const UnopposedCandidate: FC<UnopposedCandidateProps> = ({ candidate, backToRaces }) => {
    // eslint-disable-next-line no-undefined
    const [selectedCandidate, setSelectedCandidate] = useState(undefined as number);
    const candidateId = `${candidate.candidateId}`;
    return (
        <section className={global.card}>
            <p>There is only one candidate for this race.</p>
            <p>Please select them or select no one.</p>
            <div>
                <input
                    type="radio"
                    id={candidateId}
                    name="select-candidate"
                    value={candidateId}
                    onClick={() => setSelectedCandidate(candidate.candidateId)}
                />
                <label htmlFor={candidateId}>{candidate.candidateName}</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="no-one"
                    name="select-candidate"
                    value="no-one"
                    onClick={() => setSelectedCandidate(null)}
                />
                <label htmlFor="no-one">No one</label>
            </div>
            <div className={singleSelect.buttonGroup}>
                <button
                    className="link-button"
                    // eslint-disable-next-line no-undefined
                    disabled={selectedCandidate === undefined}
                    onClick={() => backToRaces(selectedCandidate, true)}
                >
                    Back to Races
                </button>
            </div>
        </section>
    );
};

export default UnopposedCandidate;
