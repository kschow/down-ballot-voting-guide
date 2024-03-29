import { render, screen } from '@testing-library/react';
import { IdProvider } from '../IdContext';
import { EditableProvider } from '../../Fields/EditableContext';
import ElectionBuilder from '../ElectionBuilder';
import userEvent from '@testing-library/user-event';

const renderElectionWithIssue = () => {
    render(
        <IdProvider>
            <EditableProvider>
                <ElectionBuilder />
            </EditableProvider>
        </IdProvider>
    );
    userEvent.click(screen.getByRole('button', { name: /Add Ballot/u }));
    userEvent.click(screen.getByRole('button', { name: /Add Race/u }));
    userEvent.click(screen.getByRole('button', { name: /Add Issue/u }));
};

it('Updates Issue name properly', () => {
    renderElectionWithIssue();

    userEvent.click(screen.getByRole('button', { name: 'Edit (Issue #3 Name)' }));
    const issueNameData = screen.getByLabelText(/Issue Name/u);
    userEvent.clear(issueNameData);
    userEvent.type(issueNameData, 'New Issue Name');
    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('New Issue Name')).toBeInTheDocument();
});

it('Updates Issue question properly', () => {
    renderElectionWithIssue();

    userEvent.click(screen.getByRole('button', { name: 'Edit (Issue #3 Question)' }));
    const issueQuestionData = screen.getByLabelText(/Issue Question/u);
    userEvent.clear(issueQuestionData);
    userEvent.type(issueQuestionData, 'What is your opinion on this issue?');
    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('What is your opinion on this issue?')).toBeInTheDocument();
});

it('Deletes an issue properly', () => {
    renderElectionWithIssue();

    expect(screen.queryByText('Issue #3')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Delete Issue #3' }));
    userEvent.click(screen.getByRole('button', { name: 'Yes' }));

    expect(screen.queryByText('Issue #3')).not.toBeInTheDocument();
});

it('Cancels a delete properly', () => {
    renderElectionWithIssue();

    expect(screen.queryByText('Issue #3')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Delete Issue #3' }));
    userEvent.click(screen.getByRole('button', { name: 'No' }));

    expect(screen.queryByText('Issue #3')).toBeInTheDocument();
});
