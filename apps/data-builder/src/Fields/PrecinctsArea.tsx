import { FC, useRef } from 'react';
import styles from './Editable.module.scss';
import FormArea from './FormArea';

type ArrayAreaProps = {
    name: string;
    label: string;
    saveField: (data: (number|string)[], event: React.SyntheticEvent) => void;
    finishEdit: (event: React.SyntheticEvent) => void;
}

const PrecinctsArea: FC<ArrayAreaProps> = (props) => {
    const {
        name,
        label,
        saveField,
        finishEdit
    } = props;

    const inputText = useRef<HTMLTextAreaElement>();

    const isSupportedPrecinct = (value: string) => {
        if (value === 'ALL' ||
            value === 'WILLIAMSON' ||
            value === 'TRAVIS') {
            return true;
        }

        return !isNaN(parseInt(value, 10));
    };

    const save = (event: React.SyntheticEvent) => {
        const inputValue = inputText.current.value;
        const arrayValue = inputValue.split(/[,\s+]/u)
            .filter((str) => isSupportedPrecinct(str));

        let precincts;
        // eslint-disable-next-line no-undefined
        if (arrayValue.find((val) => val === 'ALL') !== undefined) {
            precincts = ['ALL'];
        } else {
            precincts = arrayValue.map((stringValue) => {
                const numberVal = parseInt(stringValue, 10);
                if (isNaN(numberVal)) {
                    return stringValue;
                }
                return numberVal;
            });
        }
        saveField(precincts, event);
    };

    const Field = () => {
        return <textarea
            id={name}
            ref={inputText}
            rows={8}
            cols={50}
            autoFocus={true}
        />;
    };

    return (
        <FormArea
            name={name}
            label={label}
            formStyle={`${styles.Editable} ${styles.Vertical}`}
            saveField={save}
            finishEdit={finishEdit}
            Field={Field}
        />
    );
};

export default PrecinctsArea;
