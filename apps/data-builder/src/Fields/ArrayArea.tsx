import { FC, useRef } from 'react';
import styles from './Editable.module.scss';
import FormArea from './FormArea';

type ArrayAreaProps = {
    name: string;
    label: string;
    saveField: (data: (number|string)[], event: React.SyntheticEvent) => void;
    finishEdit: (event: React.SyntheticEvent) => void;
}

const ArrayArea: FC<ArrayAreaProps> = (props) => {
    const {
        name,
        label,
        saveField,
        finishEdit
    } = props;

    const inputText = useRef<HTMLTextAreaElement>();

    const save = (event: React.SyntheticEvent) => {
        const inputValue = inputText.current.value;
        const arrayValue = inputValue.split(/[,\s+]/u).map((str) => str.trim());

        let value;
        // eslint-disable-next-line no-undefined
        if (arrayValue.find((val) => val === 'ALL') !== undefined) {
            value = ['ALL'];
        } else {
            value = arrayValue
                .map((stringValue) => parseInt(stringValue, 10))
                .filter((val) => !isNaN(val));
        }
        saveField(value, event);
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

export default ArrayArea;
