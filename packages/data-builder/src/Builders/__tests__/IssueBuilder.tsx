import { fireEvent, render, screen } from '@testing-library/react';
import { IdProvider } from '../../IdContext';
import { EditableProvider } from '../../Fields/EditableContext';
import ElectionBuilder from '../ElectionBuilder';
import React from 'react';

const renderElectionWithIssue = () => {
    render(
        <IdProvider>
            <EditableProvider>
                <ElectionBuilder />
            </EditableProvider>
        </IdProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /Add Ballot/u }));
    fireEvent.click(screen.getByRole('button', { name: /Add Race/u }));
    fireEvent.click(screen.getByRole('button', { name: /Add Issue/u }));
};

it('Updates Issue name properly', () => {
    renderElectionWithIssue();

    fireEvent.click(screen.getByRole('button', { name: 'Edit (Issue #3 Name)' }));
    const issueNameData = screen.getByLabelText(/Issue Name/u);
    fireEvent.change(issueNameData, { target: { value: 'New Issue Name' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Issue Name: New Issue Name')).toBeInTheDocument();
});

it('Updates Issue question properly', () => {
    renderElectionWithIssue();

    fireEvent.click(screen.getByRole('button', { name: 'Edit (Issue #3 Question)' }));
    const issueNameData = screen.getByLabelText(/Issue Question/u);
    fireEvent.change(issueNameData, { target: { value: 'What is your opinion on this issue?' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Issue Question: What is your opinion on this issue?')).toBeInTheDocument();
});
