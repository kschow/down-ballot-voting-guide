import { FC } from 'react';
// using material icons
import saveIcon from './icons/save.svg';
import cancelIcon from './icons/cancel.svg';

type FormProps = {
    name: string;
    label: string;
    formStyle: string;
    saveField: (event: React.SyntheticEvent) => void;
    finishEdit: (event: React.SyntheticEvent) => void;
    Field: FC;
}

const FormArea: FC<FormProps> = (props) => {
    const {
        name,
        label,
        formStyle,
        saveField,
        finishEdit,
        Field
    } = props;

    return (
        <form className={formStyle} onSubmit={saveField}>
            <label htmlFor={name}>{label}</label>
            <Field />
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
        </form>
    );
};

export default FormArea;
