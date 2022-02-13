import { FC, useState } from 'react';
import { useSelectedCandidates } from '../../context/SelectedCandidatesContext';
import global from './Global.module.scss';

/*
 * something something can't import enums for some reason, I'll figure it out later
 * import { County } from '@dbvg/shared-types';
 */

type CountyPrecinctProps = {
    continueFn: () => void;
};

const CountyPrecinctSelection:FC<CountyPrecinctProps> = ({ continueFn }) => {
    const [county, setCounty] = useState('');
    const [precinct, setPrecinct] = useState('');
    const { selectCountyAndPrecinct } = useSelectedCandidates();

    const changeCounty = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCounty(event.currentTarget.value);
    };

    const updatePrecinct = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrecinct(event.currentTarget.value);
    };

    const isContinueDisabled = () => {
        return county === 'ALL' || precinct === '' || isNaN(parseInt(precinct, 10));
    };

    const continueFlow = () => {
        selectCountyAndPrecinct(county, parseInt(precinct, 10));
        continueFn();
    };

    return (
        <section>
            <p>Please select your County and input your Precinct.</p>
            <p>You can find this information on your Voter Registration Certificate in the box labeled Pct. No.</p>
            <p>If you do not have access to that, to find out what precinct you are in please visit either&nbsp;
                <a target="_blank" rel="noreferrer" href={'https://votetravis.com/vexpress/display.do'}>
                    Travis County
                </a>
                or&nbsp;
                <a target="_blank" rel="noreferrer" href={'https://apps.wilco.org/elections/default.aspx'}>
                    Williamson County
                </a>
            </p>
            <div className={`${global.flexColumn} ${global.input}`}>
                <label htmlFor="countySelect">Select a County:</label>
                <select
                    id="countySelect"
                    name="countySelect"
                    onChange={changeCounty}
                    value={county}
                >
                    <option value={''} />
                    <option value={'TRAVIS'}>TRAVIS</option>
                    <option value={'WILLIAMSON'}>WILLIAMSON</option>
                </select>

                <label htmlFor="precinct">Precinct:</label>
                <input
                    id="precinct"
                    name="precinct"
                    type="number"
                    onChange={updatePrecinct}
                    value={precinct}
                />

                <button onClick={continueFlow} disabled={isContinueDisabled()}>Continue</button>
            </div>
        </section>
    );
};

export default CountyPrecinctSelection;
