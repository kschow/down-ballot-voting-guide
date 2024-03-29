import { FC, useRef } from 'react';
import FormArea from './FormArea';
import styles from './Editable.module.scss';

type InputProps = {
    name: string;
    label: string;
    saveField: (fieldData: string, event: React.SyntheticEvent) => void;
    finishEdit: (event: React.SyntheticEvent) => void;
}

const Input: FC<InputProps> = (props) => {
    const {
        name,
        label,
        saveField,
        finishEdit
    } = props;

    const inputText = useRef<HTMLInputElement>();

    const Field = () => {
        return <input
            type="text"
            size={40}
            id={name}
            ref={inputText}
            autoFocus={true}
        />;
    };

    const save = (event: React.SyntheticEvent) => {
        saveField(inputText.current.value, event);
    };

    return (
        <FormArea
            name={name}
            label={label}
            formStyle={styles.Editable}
            saveField={save}
            finishEdit={finishEdit}
            Field={Field}
        />
    );
};

export default Input;
