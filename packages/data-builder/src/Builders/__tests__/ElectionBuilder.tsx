import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ElectionBuilder from '../ElectionBuilder';
import { IdProvider } from '../../IdContext';
import { EditableProvider } from '../../Fields/EditableContext';

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
    fireEvent.click(editButton);

    const updateName = screen.getByLabelText(/Election Name/u);
    fireEvent.change(updateName, { target: { value: 'new name' } });

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Election Name: new name')).toBeInTheDocument();
});

it('Adds an empty ballot when Add Ballot is pressed', () => {
    renderElectionBuilder();
    const addBallotButton = screen.getByRole('button', { name: 'Add Ballot' });
    fireEvent.click(addBallotButton);

    expect(screen.queryByText('Ballot Name: Ballot #1')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add Race' })).toBeInTheDocument();
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
    fireEvent.click(screen.getByRole('button', { name: 'Edit (Election Name)' }));
    const updateName = screen.getByLabelText(/Election Name/u);
    fireEvent.change(updateName, { target: { value: newName } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
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
    fireEvent.click(screen.getByRole('button', { name: 'Add Ballot' }));
    expect(getElectionFromLocalStorage()).toStrictEqual(addBallotStorage);
});
