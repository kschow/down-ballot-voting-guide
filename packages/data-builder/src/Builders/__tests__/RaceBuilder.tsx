import React from 'react';
import { IdProvider } from '../../IdContext';
import { EditableProvider } from '../../Fields/EditableContext';
import { render, screen } from '@testing-library/react';
import ElectionBuilder from '../ElectionBuilder';
import userEvent from '@testing-library/user-event';

const renderElectionWithRace = () => {
    render(
        <IdProvider>
            <EditableProvider>
                <ElectionBuilder />
            </EditableProvider>
        </IdProvider>
    );
    userEvent.click(screen.getByRole('button', { name: 'Add Ballot' }));
    userEvent.click(screen.getByRole('button', { name: /Add Race/u }));
};

it('Updates race name properly', () => {
    renderElectionWithRace();

    userEvent.click(screen.getByRole('button', { name: 'Edit (Race #2 Name)' }));
    const raceNameData = screen.getByLabelText(/Race Name/u);
    userEvent.clear(raceNameData);
    userEvent.type(raceNameData, 'New Race');
    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('Race Name: New Race')).toBeInTheDocument();
});

it('Updates description properly', () => {
    renderElectionWithRace();

    userEvent.click(screen.getByRole('button', { name: 'Edit (Race #2 Description)' }));
    const descriptionData = screen.getByLabelText(/Position Description/u);
    userEvent.clear(descriptionData);
    userEvent.type(descriptionData, 'new description');
    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('Position Description: new description')).toBeInTheDocument();
});

it('Adds an issue to a race properly', () => {
    renderElectionWithRace();

    userEvent.click(screen.getByRole('button', { name: 'Add Issue to Race #2' }));
    expect(screen.queryByText('Issue Name: Issue #3')).toBeInTheDocument();
});
