import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ElectionBuilder from '../ElectionBuilder';
import { IdProvider } from '../../IdContext';

const renderElectionBuilder = () => {
    render(<IdProvider>
        <ElectionBuilder />
    </IdProvider>);
};

beforeEach(() => {
    localStorage.clear();
});

const getElectionFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('election'));
};

it('Updates the election name properly', () => {
    renderElectionBuilder();

    const nameElement = screen.queryByText('Election Name:');
    expect(nameElement).toBeInTheDocument();

    const updateName = screen.getByLabelText('Election Name');
    fireEvent.change(updateName, { target: { value: 'new name' } });

    expect(screen.queryByText('Election Name: new name')).toBeInTheDocument();
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
    const updateName = screen.getByLabelText('Election Name');
    fireEvent.change(updateName, { target: { value: newName } });
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
