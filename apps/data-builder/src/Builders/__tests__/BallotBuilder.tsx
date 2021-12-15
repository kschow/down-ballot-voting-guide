import { render, screen } from '@testing-library/react';
import React from 'react';
import ElectionBuilder from '../ElectionBuilder';
import { IdProvider } from '../IdContext';
import { EditableProvider } from '../../Fields/EditableContext';
import userEvent from '@testing-library/user-event';

const renderElectionWithBallot = () => {
    render(
        <IdProvider>
            <EditableProvider>
                <ElectionBuilder />
            </EditableProvider>
        </IdProvider>
    );
    const addBallotButton = screen.getByRole('button', { name: 'Add Ballot' });
    userEvent.click(addBallotButton);
};

it('Updates ballot name properly', () => {
    renderElectionWithBallot();

    const nameElement = screen.getByText('Ballot #1');
    expect(nameElement).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Edit (Ballot #1 Name)' }));
    const updateName = screen.getByLabelText(/Ballot Name/u);
    userEvent.clear(updateName);
    userEvent.type(updateName, 'new ballot name');
    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('new ballot name')).toBeInTheDocument();
});

it('Adds a race to the ballot properly', () => {
    renderElectionWithBallot();

    userEvent.click(screen.getByRole('button', { name: 'Add Race to Ballot #1' }));
    expect(screen.queryByText('Race #2')).toBeInTheDocument();
});

describe('Collapses races properly', () => {
    it('Collapses with top image button', () => {
        renderElectionWithBallot();

        userEvent.click(screen.getByRole('button', { name: 'Add Race to Ballot #1' }));
        expect(screen.queryByText('Race #2')).toBeInTheDocument();

        const collapseBallotButtons = screen.getAllByRole('button', { name: 'Collapse Ballot #1' });
        userEvent.click(collapseBallotButtons[0]);

        expect(screen.queryByText('Race #2')).not.toBeInTheDocument();
    });

    it('Collapses with bottom text button', () => {
        renderElectionWithBallot();

        userEvent.click(screen.getByRole('button', { name: 'Add Race to Ballot #1' }));
        expect(screen.queryByText('Race #2')).toBeInTheDocument();

        const collapseBallotButtons = screen.getAllByRole('button', { name: 'Collapse Ballot #1' });
        userEvent.click(collapseBallotButtons[1]);

        expect(screen.queryByText('Race #2')).not.toBeInTheDocument();
    });

    it('Only displays bottom text button if not collapsed and there is at least one race', () => {
        renderElectionWithBallot();

        let collapseBallotButtons = screen.getAllByRole('button', { name: 'Collapse Ballot #1' });
        expect(collapseBallotButtons).toHaveLength(1);

        userEvent.click(screen.getByRole('button', { name: 'Add Race to Ballot #1' }));

        collapseBallotButtons = screen.getAllByRole('button', { name: 'Collapse Ballot #1' });
        expect(collapseBallotButtons).toHaveLength(2);

        userEvent.click(collapseBallotButtons[0]);

        collapseBallotButtons = screen.getAllByRole('button', { name: 'Collapse Ballot #1' });
        expect(collapseBallotButtons).toHaveLength(1);
    });
});

it('displays a second add race button at the bottom if there are any races on the ballot', () => {
    renderElectionWithBallot();

    const addRaceText = 'Add Race to Ballot #1';
    expect(screen.queryAllByText(addRaceText)).toHaveLength(1);
    userEvent.click(screen.getByRole('button', { name: addRaceText }));

    expect(screen.queryAllByText(addRaceText)).toHaveLength(2);
});
