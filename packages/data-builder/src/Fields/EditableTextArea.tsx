import React, { FC, useRef } from 'react';
import styles from './Editable.module.scss';
import EditableFormArea from './EditableFormArea';

type TextAreaProps = {
    name: string;
    label: string;
    saveField: (fieldData: string, event: React.SyntheticEvent) => void;
    finishEdit: (event: React.SyntheticEvent) => void;
}

const EditableTextArea: FC<TextAreaProps> = (props) => {
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
        <EditableFormArea
            name={name}
            label={label}
            formStyle={`${styles.Editable} ${styles.Vertical}`}
            saveField={save}
            finishEdit={finishEdit}
            Field={Field}
        />
    );
};

export default EditableTextArea;
