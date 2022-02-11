import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import EditableField from '../EditableField';
import { EditableProvider } from '../EditableContext';
import FieldTypes from '../FieldTypes';
import userEvent from '@testing-library/user-event';
import FormUpdateType from '../FormUpdateType';
import { County } from '@dbvg/shared-types';

const TestSubject = () => {
    const [firstInput, setFirstInput] = useState('first input' as FormUpdateType);
    const [secondInput, setSecondInput] = useState('second input' as FormUpdateType);
    const [textArea, setTextArea] = useState('textArea' as FormUpdateType);
    const [arrayArea, setArrayArea] = useState([] as FormUpdateType);
    const [countySelect, setCountySelect] = useState(County.ALL as FormUpdateType);

    return (
        <div>
            <EditableField
                type={FieldTypes.Input}
                name="First Input"
                label="First Input: "
                data={firstInput}
                updateField={setFirstInput}
            />
            <EditableField
                type={FieldTypes.Input}
                name={'Second Input'}
                label={'Second Input: '}
                data={secondInput}
                updateField={setSecondInput}
            />
            <EditableField
                type={FieldTypes.TextArea}
                name={'TextArea'}
                label={'TextArea: '}
                data={textArea}
                updateField={setTextArea}
            />
            <EditableField
                type={FieldTypes.ArrayArea}
                name={'ArrayArea'}
                label={'ArrayArea: '}
                data={arrayArea}
                updateField={setArrayArea}
            />
            <EditableField
                type={FieldTypes.CountySelect}
                name={'CountySelect'}
                label={'CountySelect: '}
                data={countySelect}
                updateField={setCountySelect}
            />
        </div>
    );
};

const renderTestSubject = () => {
    render(
        <EditableProvider>
            <TestSubject />
        </EditableProvider>
    );
};

it('Displays all labels and fields to start', () => {
    renderTestSubject();

    expect(screen.queryByText('first input')).toBeInTheDocument();
    expect(screen.queryByText('second input')).toBeInTheDocument();
    expect(screen.queryByText('textArea')).toBeInTheDocument();
    expect(screen.getByText('[]')).toBeInTheDocument();
    expect(screen.getByText('ALL')).toBeInTheDocument();
});

it('Has all fields editable to start', () => {
    renderTestSubject();

    const editableButtons = screen.getAllByRole('button', { name: /Edit/u });
    expect(editableButtons).toHaveLength(5);
    editableButtons.forEach((button) => {
        expect(button).toBeEnabled();
    });
});

it('Only allows one field to be editable at a time', () => {
    renderTestSubject();

    let editableButtons = screen.getAllByRole('button', { name: /Edit/u });
    userEvent.click(editableButtons[0]);

    editableButtons = screen.getAllByRole('button', { name: /Edit/u });
    expect(editableButtons).toHaveLength(4);
    editableButtons.forEach((button) => {
        expect(button).toBeDisabled();
    });
});

it('Clicking edit on a field displays edit capability for that field', () => {
    renderTestSubject();

    const editFirst = screen.getByRole('button', { name: 'Edit (First Input)' });
    userEvent.click(editFirst);

    expect(screen.getByLabelText(/First Input:/u)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cancel' })).toBeInTheDocument();
});

it('Cancels an update returning to all fields to editable with no changes', () => {
    renderTestSubject();

    const editFirst = screen.getByRole('button', { name: 'Edit (First Input)' });
    userEvent.click(editFirst);

    const firstData = screen.getByLabelText(/First Input/u);
    userEvent.type(firstData, 'will not be saved');
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    userEvent.click(cancel);

    expect(screen.getByText('first input')).toBeInTheDocument();
    expect(screen.queryByText(/will not be saved/u)).not.toBeInTheDocument();
    const editableButtons = screen.getAllByRole('button', { name: /Edit/u });
    expect(editableButtons).toHaveLength(5);
    editableButtons.forEach((button) => {
        expect(button).toBeEnabled();
    });
});

it('Saves an edit persisting value and returning all fields to editable', () => {
    renderTestSubject();

    const editSecond = screen.getByRole('button', { name: 'Edit (Second Input)' });
    userEvent.click(editSecond);

    const secondData = screen.getByLabelText(/Second Input/u);
    userEvent.type(secondData, 'will be saved');
    const save = screen.getByRole('button', { name: 'Save' });
    userEvent.click(save);

    expect(screen.queryByText('will be saved')).toBeInTheDocument();
    const editableButtons = screen.getAllByRole('button', { name: /Edit/u });
    expect(editableButtons).toHaveLength(5);
    editableButtons.forEach((button) => {
        expect(button).toBeEnabled();
    });
});

it('Updates a textarea properly', () => {
    renderTestSubject();

    const editTextArea = screen.getByRole('button', { name: 'Edit (TextArea)' });
    userEvent.click(editTextArea);

    const textAreaData = screen.getByLabelText(/TextArea/u);
    userEvent.type(textAreaData, 'saves properly');
    const save = screen.getByRole('button', { name: 'Save' });
    userEvent.click(save);

    expect(screen.queryByText('saves properly')).toBeInTheDocument();
});

it('Updates an array area properly', () => {
    renderTestSubject();

    const editArrayArea = screen.getByRole('button', { name: 'Edit (ArrayArea)' });
    userEvent.click(editArrayArea);

    const arrayAreaData = screen.getByLabelText(/ArrayArea/u);
    userEvent.type(arrayAreaData, '1,2\n4, 23');
    const save = screen.getByRole('button', { name: 'Save' });
    userEvent.click(save);

    expect(screen.getByText('[1, 2, 4, 23]')).toBeInTheDocument();
});

it('Updates an array with ALL as priority', () => {
    renderTestSubject();

    const editArrayArea = screen.getByRole('button', { name: 'Edit (ArrayArea)' });
    userEvent.click(editArrayArea);

    const arrayAreaData = screen.getByLabelText(/ArrayArea/u);
    userEvent.type(arrayAreaData, '1,2, 4, ALL, 23');
    const save = screen.getByRole('button', { name: 'Save' });
    userEvent.click(save);

    expect(screen.getByText('[ALL]')).toBeInTheDocument();
});

it('Updates a county select properly', () => {
    renderTestSubject();

    const editCountySelect = screen.getByRole('button', { name: 'Edit (CountySelect)' });
    userEvent.click(editCountySelect);

    const countySelectData = screen.getByRole('combobox', { name: 'CountySelect:' });
    userEvent.selectOptions(countySelectData, ['TRAVIS']);

    const save = screen.getByRole('button', { name: 'Save' });
    userEvent.click(save);

    expect(screen.queryByText('ALL')).not.toBeInTheDocument();
    expect(screen.queryByText('TRAVIS')).toBeInTheDocument();
});
