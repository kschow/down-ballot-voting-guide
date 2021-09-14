import React from 'react';
import { act, render, screen } from '@testing-library/react';
import ElectionBuilder from '../ElectionBuilder';
import { IdProvider } from '../../IdContext';
import { EditableProvider } from '../../Fields/EditableContext';
import userEvent from '@testing-library/user-event';

const renderElectionBuilder = () => {
    render(
        <IdProvider>
            <EditableProvider>
                <ElectionBuilder />
            </EditableProvider>
        </IdProvider>
    );
};

beforeEach(() => {
    localStorage.clear();
});

const getElectionFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('election'));
};

it('Updates the election name properly', () => {
    renderElectionBuilder();

    const nameElement = screen.queryByText(/Election Name:/u);
    expect(nameElement).toBeInTheDocument();

    const editButton = screen.getByRole('button', { name: 'Edit (Election Name)' });
    userEvent.click(editButton);

    const updateName = screen.getByLabelText(/Election Name/u);
    userEvent.clear(updateName);
    userEvent.type(updateName, 'new name');

    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Election Name: new name')).toBeInTheDocument();
});

it('Adds an empty ballot when Add Ballot is pressed', () => {
    renderElectionBuilder();
    const addBallotButton = screen.getByRole('button', { name: 'Add Ballot' });
    userEvent.click(addBallotButton);

    expect(screen.queryByText('Ballot Name: Ballot #1')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add Race to Ballot #1' })).toBeInTheDocument();
});

it('Saves to localStorage on changes to election', () => {
    renderElectionBuilder();
    const initialStorage = {
        electionName: '',
        ballots: []
    };
    expect(getElectionFromLocalStorage()).toStrictEqual(initialStorage);

    const newName = 'new name';
    const updateNameStorage = {
        electionName: newName,
        ballots: []
    };
    userEvent.click(screen.getByRole('button', { name: 'Edit (Election Name)' }));
    const updateName = screen.getByLabelText(/Election Name/u);
    userEvent.clear(updateName);
    userEvent.type(updateName, newName);

    /*
     * Explicit call to act to make sure the useEffect is called to save to localStorage.
     * Could also have used useLayoutEffect in the ElectionBuilder
     * but I don't want to force the synchronous action there
     */
    act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Save' }));
    });
    expect(getElectionFromLocalStorage()).toStrictEqual(updateNameStorage);

    const addBallotStorage = {
        electionName: newName,
        ballots: [
            {
                ballotId: 1,
                ballotName: 'Ballot #1',
                races: []
            }
        ]
    };

    act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Add Ballot' }));
    });
    expect(getElectionFromLocalStorage()).toStrictEqual(addBallotStorage);
});
