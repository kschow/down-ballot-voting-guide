import React, { FC, useState } from 'react';
import { useEditable } from './EditableContext';
import styles from './Editable.module.scss';
// using material icons
import saveIcon from './icons/save.svg';
import cancelIcon from './icons/cancel.svg';
import editIcon from './icons/edit.svg';
import disabledEdit from './icons/edit-disabled.svg';

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
            setFieldData(data ? data : '');
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
        <>
            { areEditing ?
                <form className={styles.Editable} onSubmit={saveField}>
                    <label htmlFor={name}>{label}</label>
                    <input type="text" id={name} onChange={updateFieldData} value={fieldData} />
                    <div>
                        <input
                            type="image"
                            name="submit"
                            src={saveIcon}
                            onClick={saveField}
                            alt="Save"
                            title="Save"
                        />
                        <input
                            type="image"
                            name="cancel"
                            src={cancelIcon}
                            onClick={finishEdit}
                            alt="Cancel"
                            title="Cancel"
                        />
                    </div>
                </form> :
                <div className={styles.Editable}>
                    <span>{`${label} ${data}`}</span>
                    <input
                        type="image"
                        disabled={!isEditable}
                        onClick={enableEditing}
                        src={isEditable ? editIcon : disabledEdit}
                        alt={`Edit (${name})`}
                        title="Edit"
                    />
                </div>
            }
        </>
    );
};

export default EditableField;
