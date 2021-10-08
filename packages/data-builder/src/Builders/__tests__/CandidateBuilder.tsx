import { render, screen } from '@testing-library/react';
import { IdProvider } from '../IdContext';
import { EditableProvider } from '../../Fields/EditableContext';
import ElectionBuilder from '../ElectionBuilder';
import React from 'react';
import userEvent from '@testing-library/user-event';

const renderElectionWithIssueAndCandidate = (extraIssues?: number) => {
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
    userEvent.click(screen.getByRole('button', { name: /Add Candidate/u }));
    for (let times = 0; times < extraIssues; times++) {
        userEvent.click(screen.getByRole('button', { name: /Add Issue/u }));
    }
};

describe('Updates candidate fields properly', () => {
    it('Updates name properly', () => {
        renderElectionWithIssueAndCandidate();

        userEvent.click(screen.getByRole('button', { name: 'Edit (Candidate #4 Name)' }));
        const candidateNameData = screen.getByLabelText(/Candidate Name/u);
        userEvent.clear(candidateNameData);
        userEvent.type(candidateNameData, 'new name');
        userEvent.click(screen.getByRole('button', { name: 'Save' }));

        expect(screen.queryByText('new name')).toBeInTheDocument();
    });

    it('Updates education properly', () => {
        renderElectionWithIssueAndCandidate();

        userEvent.click(screen.getByRole('button', { name: 'Edit (Candidate #4 Education)' }));
        const educationData = screen.getByLabelText(/Education/u);
        userEvent.clear(educationData);
        userEvent.type(educationData, 'my education');
        userEvent.click(screen.getByRole('button', { name: 'Save' }));

        expect(screen.queryByText('my education')).toBeInTheDocument();
    });

    it('Updates website properly', () => {
        renderElectionWithIssueAndCandidate();

        userEvent.click(screen.getByRole('button', { name: 'Edit (Candidate #4 Campaign Website)' }));
        const websiteData = screen.getByLabelText(/Campaign Website/u);
        userEvent.clear(websiteData);
        userEvent.type(websiteData, 'www.website.com');
        userEvent.click(screen.getByRole('button', { name: 'Save' }));

        expect(screen.queryByText('www.website.com')).toBeInTheDocument();
    });

    it('Updates facebook page properly', () => {
        renderElectionWithIssueAndCandidate();

        userEvent.click(screen.getByRole('button', { name: 'Edit (Candidate #4 Facebook Page)' }));
        const facebookData = screen.getByLabelText(/Facebook Page/u);
        userEvent.clear(facebookData);
        userEvent.type(facebookData, 'www.facebook.com');
        userEvent.click(screen.getByRole('button', { name: 'Save' }));

        expect(screen.queryByText('www.facebook.com')).toBeInTheDocument();
    });

    it('Updates twitter properly', () => {
        renderElectionWithIssueAndCandidate();

        userEvent.click(screen.getByRole('button', { name: 'Edit (Candidate #4 Twitter Profile)' }));
        const twitterData = screen.getByLabelText(/Twitter Profile/u);
        userEvent.clear(twitterData);
        userEvent.type(twitterData, 'www.twitter.com');
        userEvent.click(screen.getByRole('button', { name: 'Save' }));

        expect(screen.queryByText('www.twitter.com')).toBeInTheDocument();
    });

    it('Updates video properly', () => {
        renderElectionWithIssueAndCandidate();

        userEvent.click(screen.getByRole('button', { name: 'Edit (Candidate #4 Video Link)' }));
        const videoData = screen.getByLabelText(/Video Link/u);
        userEvent.clear(videoData);
        userEvent.type(videoData, 'www.vimeo.com');
        userEvent.click(screen.getByRole('button', { name: 'Save' }));

        expect(screen.queryByText('www.vimeo.com')).toBeInTheDocument();
    });
});

it('Updates candidate position properly', () => {
    renderElectionWithIssueAndCandidate();

    const editButton = screen.getByRole('button',
        { name: 'Edit (Position for Candidate #4 and Issue #3)' });

    userEvent.click(editButton);
    const positionData = screen.getByLabelText(/Position/u);
    userEvent.clear(positionData);
    userEvent.type(positionData, 'new position');
    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('new position')).toBeInTheDocument();
});

describe('Collapses properly', () => {
    it('Collapses the whole candidate properly', () => {
        renderElectionWithIssueAndCandidate();

        expect(screen.queryByText('Information:')).toBeInTheDocument();
        expect(screen.queryByText('Positions:')).toBeInTheDocument();

        const collapseButton = screen.getByRole('button', { name: 'Collapse Candidate #4' });
        userEvent.click(collapseButton);

        expect(screen.queryByText('Information:')).not.toBeInTheDocument();
        expect(screen.queryByText('Positions:')).not.toBeInTheDocument();
    });

    it('Collapses positions properly', () => {
        renderElectionWithIssueAndCandidate(2);

        expect(screen.queryAllByText('Position:')).toHaveLength(3);

        const collapseButton = screen.getByRole('button', { name: 'Collapse Candidate #4 Positions' });
        userEvent.click(collapseButton);

        expect(screen.queryAllByText('Position:')).toHaveLength(0);
    });
});
