import React from 'react';
import { IdProvider } from '../../IdContext';
import { EditableProvider } from '../../Fields/EditableContext';
import { fireEvent, render, screen } from '@testing-library/react';
import ElectionBuilder from '../ElectionBuilder';

const renderElectionWithRace = () => {
    render(
        <IdProvider>
            <EditableProvider>
                <ElectionBuilder />
            </EditableProvider>
        </IdProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add Ballot' }));
    fireEvent.click(screen.getByRole('button', { name: /Add Race/u }));
};

it('Updates race name properly', () => {
    renderElectionWithRace();

    fireEvent.click(screen.getByRole('button', { name: 'Edit (Race #2 Name)' }));
    const raceNameData = screen.getByLabelText(/Race Name/u);
    fireEvent.change(raceNameData, { target: { value: 'New Race' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('Race Name: New Race')).toBeInTheDocument();
});

it('Updates description properly', () => {
    renderElectionWithRace();

    fireEvent.click(screen.getByRole('button', { name: 'Edit (Race #2 Description)' }));
    const descriptionData = screen.getByLabelText(/Position Description/u);
    fireEvent.change(descriptionData, { target: { value: 'new description' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('Position Description: new description')).toBeInTheDocument();
});
