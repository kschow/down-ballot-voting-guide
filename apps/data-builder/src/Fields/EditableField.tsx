import { FC, useState } from 'react';
import { useEditable } from './EditableContext';
import FieldTypes from './FieldTypes';
import FormUpdateType from './FormUpdateType';
import Input from './Input';
import TextArea from './TextArea';
import PrecinctsArea from './PrecinctsArea';
import CountySelect from './CountySelect';
import styles from './Editable.module.scss';
import global from '../Global.module.scss';
// using material icons
import editIcon from './icons/edit.svg';
import disabledEdit from './icons/edit-disabled.svg';

type EditableFieldProps = {
    type: FieldTypes;
    name: string;
    label: string;
    data: FormUpdateType;
    updateField: (input: FormUpdateType) => void;
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

    const saveField = (fieldData: FormUpdateType, event: React.SyntheticEvent) => {
        updateField(fieldData);
        finishEdit(event);
    };

    const determineFormStructure = () => {
        switch (type) {
        case FieldTypes.Input:
            return <Input
                name={name}
                label={label}
                saveField={saveField}
                finishEdit={finishEdit}
            />;
        case FieldTypes.TextArea:
            return <TextArea
                name={name}
                label={label}
                saveField={saveField}
                finishEdit={finishEdit}
            />;
        case FieldTypes.PrecinctsArea:
            return <PrecinctsArea
                name={name}
                label={label}
                saveField={saveField}
                finishEdit={finishEdit}
            />;
        case FieldTypes.CountySelect:
            return <CountySelect
                name={name}
                label={label}
                saveField={saveField}
                finishEdit={finishEdit}
            />;
        default:
            throw new Error('Unsupported field type');
        }
    };

    const displayData = () => {
        switch (type) {
        case FieldTypes.PrecinctsArea: {
            const arrayData = data as (number|string)[];
            return `[${arrayData.join(', ')}]`;
        }
        case FieldTypes.Input:
        case FieldTypes.TextArea:
        default:
            return data ? data : '';
        }
    };

    return (
        <>
            { areEditing ?
                determineFormStructure() :
                <div className={styles.Editable}>
                    <div>
                        <p className={global.label}>{label}</p>
                        <p>{displayData()}</p>
                    </div>
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
