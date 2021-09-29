import { render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import EditableField from '../EditableField';
import { EditableProvider } from '../EditableContext';
import FieldTypes from '../FieldTypes';
import userEvent from '@testing-library/user-event';

const TestSubject = () => {
    const [first, setFirst] = useState('first');
    const [second, setSecond] = useState('second');
    const [third, setThird] = useState('third');

    return (
        <div>
            <EditableField
                name="First"
                label="First: "
                data={first}
                updateField={setFirst}
                type={FieldTypes.Input}
            />
            <EditableField
                name={'Second'}
                label={'Second: '}
                data={second}
                updateField={setSecond}
                type={FieldTypes.Input}
            />
            <EditableField
                name={'Third'}
                label={'Third: '}
                data={third}
                updateField={setThird}
                type={FieldTypes.TextArea}
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

    expect(screen.queryByText('First: first')).toBeInTheDocument();
    expect(screen.queryByText('Second: second')).toBeInTheDocument();
    expect(screen.queryByText('Third: third')).toBeInTheDocument();
});

it('Has all fields editable to start', () => {
    renderTestSubject();

    const editableButtons = screen.getAllByRole('button', { name: /Edit/u });
    expect(editableButtons).toHaveLength(3);
    editableButtons.forEach((button) => {
        expect(button).toBeEnabled();
    });
});

it('Only allows one field to be editable at a time', () => {
    renderTestSubject();

    let editableButtons = screen.getAllByRole('button', { name: /Edit/u });
    userEvent.click(editableButtons[0]);

    editableButtons = screen.getAllByRole('button', { name: /Edit/u });
    expect(editableButtons).toHaveLength(2);
    editableButtons.forEach((button) => {
        expect(button).toBeDisabled();
    });
});

it('Clicking edit on a field displays edit capability for that field', () => {
    renderTestSubject();

    const editFirst = screen.getByRole('button', { name: 'Edit (First)' });
    userEvent.click(editFirst);

    expect(screen.getByLabelText(/First:/u)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cancel' })).toBeInTheDocument();
});

it('Cancelling an update returns to all fields editable with no changes', () => {
    renderTestSubject();

    const editFirst = screen.getByRole('button', { name: 'Edit (First)' });
    userEvent.click(editFirst);

    const firstData = screen.getByLabelText(/First/u);
    userEvent.type(firstData, 'will not be saved');
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    userEvent.click(cancel);

    expect(screen.getByText('First: first')).toBeInTheDocument();
    expect(screen.queryByText(/will not be saved/u)).not.toBeInTheDocument();
    const editableButtons = screen.getAllByRole('button', { name: /Edit/u });
    expect(editableButtons).toHaveLength(3);
    editableButtons.forEach((button) => {
        expect(button).toBeEnabled();
    });
});

it('Saving an edit persists value and returns all fields to editable', () => {
    renderTestSubject();

    const editSecond = screen.getByRole('button', { name: 'Edit (Second)' });
    userEvent.click(editSecond);

    const secondData = screen.getByLabelText(/Second/u);
    userEvent.type(secondData, 'will be saved');
    const save = screen.getByRole('button', { name: 'Save' });
    userEvent.click(save);

    expect(screen.queryByText('Second: will be saved')).toBeInTheDocument();
    const editableButtons = screen.getAllByRole('button', { name: /Edit/u });
    expect(editableButtons).toHaveLength(3);
    editableButtons.forEach((button) => {
        expect(button).toBeEnabled();
    });
});
