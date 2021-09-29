import React, { FC, useState } from 'react';
import { useEditable } from './EditableContext';
import FieldTypes from './FieldTypes';
import EditableInput from './EditableInput';
import EditableTextArea from './EditableTextArea';
import styles from './Editable.module.scss';
// using material icons
import editIcon from './icons/edit.svg';
import disabledEdit from './icons/edit-disabled.svg';

type EditableFieldProps = {
    type: FieldTypes;
    name: string;
    label: string;
    data: string;
    updateField: (input: string) => void;
};

const EditableField:FC<EditableFieldProps> = (props) => {
    const { type, name, label, data, updateField } = props;
    const { isEditable, toggleEditable } = useEditable();
    const [areEditing, setAreEditing] = useState(false);

    const enableEditing = () => {
        if (isEditable) {
            setAreEditing(true);
            toggleEditable();
        }
    };

    const finishEdit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!isEditable) {
            toggleEditable();
            setAreEditing(false);
        }
    };

    const saveField = (fieldData: string, event: React.SyntheticEvent) => {
        updateField(fieldData);
        finishEdit(event);
    };

    const determineFormStructure = () => {
        switch (type) {
        case FieldTypes.Input:
            return <EditableInput
                name={name}
                label={label}
                saveField={saveField}
                finishEdit={finishEdit}
            />;
        case FieldTypes.TextArea:
            return <EditableTextArea
                name={name}
                label={label}
                saveField={saveField}
                finishEdit={finishEdit}
            />;
        default:
            throw new Error('Unsupported field type');
        }
    };

    return (
        <>
            { areEditing ?
                determineFormStructure() :
                <div className={styles.Editable}>
                    <span>{`${label} ${data ? data : ''}`}</span>
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
