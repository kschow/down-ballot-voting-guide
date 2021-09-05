import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ElectionBuilder from '../ElectionBuilder';
import { IdProvider } from '../../IdContext';

const renderElectionWithBallot = () => {
    render(<IdProvider>
        <ElectionBuilder />
    </IdProvider>);
    const addBallotButton = screen.getByRole('button', { name: 'Add Ballot' });
    fireEvent.click(addBallotButton);
};

it('Updates ballot name properly', () => {
    renderElectionWithBallot();

    const nameElement = screen.getByText('Ballot Name: Ballot #1');
    expect(nameElement).toBeInTheDocument();

    const updateName = screen.getByLabelText('Ballot Name');
    fireEvent.change(updateName, { target: { value: 'ballot name' } });

    expect(screen.getByText('Ballot Name: ballot name')).toBeInTheDocument();
});

