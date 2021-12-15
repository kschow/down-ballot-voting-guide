import React from 'react';
import App from '../App';
import { Election } from '@dbvg/shared-types';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    localStorage.clear();
});

it('Starts a new election properly', () => {
    render(<App />);

    const startButton = screen.getByRole('button', { name: 'Start new election' });
    userEvent.click(startButton);

    expect(screen.queryByText('Election Name:')).toBeInTheDocument();
    expect(screen.queryByText('Ballot Name:')).not.toBeInTheDocument();
});

it('Does not erroneously display Continue from last saved message if a user has not used the app', () => {
    render(<App />);

    expect(screen.queryByText('Continue from last saved')).not.toBeInTheDocument();
});

it('Recognizes and loads from local storage properly', () => {
    const initialStorage = {
        electionName: 'election exists',
        ballots: [
            {
                ballotId: 1,
                ballotName: 'ballot exists',
                races: []
            }
        ]
    } as Election;

    localStorage.setItem('election', JSON.stringify(initialStorage));

    render(<App />);

    const startFromPrevious = screen.getByRole('button', { name: 'Continue from last saved' });
    userEvent.click(startFromPrevious);

    expect(screen.queryByText('election exists')).toBeInTheDocument();
    expect(screen.queryByText('ballot exists')).toBeInTheDocument();
});
