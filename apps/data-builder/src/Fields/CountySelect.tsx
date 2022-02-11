import { FC, useRef } from 'react';
import styles from './Editable.module.scss';
import FormArea from './FormArea';
import { County } from '@dbvg/shared-types';

type CountySelectProps = {
    name: string;
    label: string;
    saveField: (fieldData: County, event: React.SyntheticEvent) => void;
    finishEdit: (event: React.SyntheticEvent) => void;
}

const CountySelect: FC<CountySelectProps> = (props) => {
    const {
        name,
        label,
        saveField,
        finishEdit
    } = props;

    const selectOption = useRef<HTMLSelectElement>();

    const save = (event: React.SyntheticEvent) => {
        const inputValue = selectOption.current.value;

        let countyValue = County.ALL;
        if (inputValue === 'TRAVIS') {
            countyValue = County.TRAVIS;
        } else if (inputValue === 'WILLIAMSON') {
            countyValue = County.WILLIAMSON;
        }

        saveField(countyValue, event);
    };

    const displayCountyOptions = () => {
        const options = [];

        // eslint-disable-next-line guard-for-in
        for (const county in County) {
            options.push(<option key={county} value={county}>{county}</option>);
        }
        return options;
    };

    const Field = () => {
        return (
            <select id={name} ref={selectOption}>
                { displayCountyOptions() }
            </select>
        );
    };

    return (
        <FormArea
            name={name}
            label={label}
            formStyle={`${styles.Editable}`}
            saveField={save}
            finishEdit={finishEdit}
            Field={Field}
        />
    );
};

export default CountySelect;
