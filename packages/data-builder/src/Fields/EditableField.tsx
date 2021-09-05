import React, { FC, useState } from 'react';
import { useEditable } from './EditableContext';

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

    const saveField = () => {
        updateField(fieldData);
        finishEdit();
    };

    return (
        <div>
            { areEditing ?
                <>
                    <label htmlFor={name}>{label}</label>
                    <input id={name} onChange={updateFieldData} value={fieldData} />
                    <button onClick={saveField}>Save</button>
                    <button onClick={finishEdit}>Cancel</button>
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
