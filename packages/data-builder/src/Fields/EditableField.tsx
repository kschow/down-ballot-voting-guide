import React, { FC, useState } from 'react';
import { useEditable } from './EditableContext';
import styles from './Editable.module.scss';

type EditableFieldProps = {
    name: string;
    label: string;
    data: string;
    updateField: (input: string) => void;
};

const EditableField:FC<EditableFieldProps> = (props) => {
    const { label, name, data, updateField } = props;
    const { isEditable, toggleEditable } = useEditable();
    const [areEditing, setAreEditing] = useState(false);
    const [fieldData, setFieldData] = useState(data);

    const enableEditing = () => {
        if (isEditable) {
            setFieldData(data);
            setAreEditing(true);
            toggleEditable();
        }
    };

    const updateFieldData = (event: React.FormEvent<HTMLInputElement>) => {
        setFieldData(event.currentTarget.value);
    };

    const finishEdit = () => {
        if (!isEditable) {
            toggleEditable();
            setAreEditing(false);
        }
    };

    const saveField = (event: React.SyntheticEvent) => {
        event.preventDefault();
        updateField(fieldData);
        finishEdit();
    };

    return (
        <div className={styles.Editable}>
            { areEditing ?
                <>
                    <form onSubmit={saveField}>
                        <label htmlFor={name}>{label}</label>
                        <input id={name} onChange={updateFieldData} value={fieldData} />
                        <button type="submit" onClick={saveField}>Save</button>
                        <button type="reset" onClick={finishEdit}>Cancel</button>
                    </form>
                </> :
                <>
                    <span>{`${label} ${data}`}</span>
                    <button
                        disabled={!isEditable && !areEditing}
                        onClick={enableEditing}
                    >
                        {`Edit (${name})`}
                    </button>
                </>
            }
        </div>
    );
};

export default EditableField;
