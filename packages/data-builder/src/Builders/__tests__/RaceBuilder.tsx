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

    expect(screen.queryByText('New Race')).toBeInTheDocument();
});

it('Updates description properly', () => {
    renderElectionWithRace();

    userEvent.click(screen.getByRole('button', { name: 'Edit (Race #2 Description)' }));
    const descriptionData = screen.getByLabelText(/Position Description/u);
    userEvent.clear(descriptionData);
    userEvent.type(descriptionData, 'new description');
    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('new description')).toBeInTheDocument();
});

describe('Adds an issue to a race properly', () => {
    it('Adds a blank issue to a race properly', () => {
        renderElectionWithRace();

        userEvent.click(screen.getByRole('button', { name: 'Add Issue to Race #2' }));
        expect(screen.queryByText('Issue #3')).toBeInTheDocument();
    });

    it('Adds a position to every candidate on the race', () => {
        renderElectionWithRace();

        userEvent.click(screen.getByRole('button', { name: 'Add Candidate to Race #2' }));
        userEvent.click(screen.getByRole('button', { name: 'Add Candidate to Race #2' }));
        expect(screen.queryAllByText(/Position:/u)).toHaveLength(0);

        userEvent.click(screen.getByRole('button', { name: 'Add Issue to Race #2' }));
        expect(screen.queryAllByText(/Position:/u)).toHaveLength(2);
    });
});

describe('Adds a candidate to a race properly', () => {
    it('Adds a candidate without any positions if there are no issues on the race', () => {
        renderElectionWithRace();

        userEvent.click(screen.getByRole('button', { name: 'Add Candidate to Race #2' }));
        expect(screen.queryByText('Candidate #3')).toBeInTheDocument();
        expect(screen.queryByText(/Position:/u)).not.toBeInTheDocument();
    });

    it('Adds a candidate with positions for all issues on a race', () => {
        renderElectionWithRace();

        userEvent.click(screen.getByRole('button', { name: 'Add Issue to Race #2' }));
        userEvent.click(screen.getByRole('button', { name: 'Add Issue to Race #2' }));
        expect(screen.queryAllByText(/Position:/u)).toHaveLength(0);

        userEvent.click(screen.getByRole('button', { name: 'Add Candidate to Race #2' }));
        expect(screen.queryAllByText(/Position:/u)).toHaveLength(2);
    });
});
