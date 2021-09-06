import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ElectionBuilder from '../ElectionBuilder';
import { IdProvider } from '../../IdContext';
import { EditableProvider } from '../../Fields/EditableContext';

const renderElectionWithBallot = () => {
    render(
        <IdProvider>
            <EditableProvider>
                <ElectionBuilder />
            </EditableProvider>
        </IdProvider>
    );
    const addBallotButton = screen.getByRole('button', { name: 'Add Ballot' });
    fireEvent.click(addBallotButton);
};

it('Updates ballot name properly', () => {
    renderElectionWithBallot();

    const nameElement = screen.getByText('Ballot Name: Ballot #1');
    expect(nameElement).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Edit (Ballot #1 Name)' }));
    const updateName = screen.getByLabelText(/Ballot Name/u);
    fireEvent.change(updateName, { target: { value: 'ballot name' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Ballot Name: ballot name')).toBeInTheDocument();
});

