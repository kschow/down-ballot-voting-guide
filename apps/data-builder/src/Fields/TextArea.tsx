import { FC, useRef } from 'react';
import styles from './Editable.module.scss';
import FormArea from './FormArea';

type TextAreaProps = {
    name: string;
    label: string;
    saveField: (fieldData: string, event: React.SyntheticEvent) => void;
    finishEdit: (event: React.SyntheticEvent) => void;
}

const TextArea: FC<TextAreaProps> = (props) => {
    const {
        name,
        label,
        saveField,
        finishEdit
    } = props;

    const inputText = useRef<HTMLTextAreaElement>();

    const save = (event: React.SyntheticEvent) => {
        saveField(inputText.current.value, event);
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

export default TextArea;
