import { render, screen } from '@testing-library/react';
import { IdProvider } from '../IdContext';
import { EditableProvider } from '../../Fields/EditableContext';
import ElectionBuilder from '../ElectionBuilder';
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

    const addIssueButton = screen.getByRole('button', { name: /Add Issue/u });
    const addCandidateButton = screen.getByRole('button', { name: /Add Candidate/u });
    userEvent.click(addIssueButton);
    userEvent.click(addCandidateButton);
    for (let times = 0; times < extraIssues; times++) {
        userEvent.click(addIssueButton);
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
    describe('Collapses the whole candidate properly', () => {
        it('Collapses with top image button', () => {
            renderElectionWithIssueAndCandidate();

            expect(screen.queryByText('Information:')).toBeInTheDocument();
            expect(screen.queryByText('Positions:')).toBeInTheDocument();

            const collapseButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4' });
            userEvent.click(collapseButtons[0]);

            expect(screen.queryByText('Information:')).not.toBeInTheDocument();
            expect(screen.queryByText('Positions:')).not.toBeInTheDocument();
        });

        it('Collapses with bottom text button', () => {
            renderElectionWithIssueAndCandidate();

            expect(screen.queryByText('Information:')).toBeInTheDocument();
            expect(screen.queryByText('Positions:')).toBeInTheDocument();

            const collapseButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4' });
            userEvent.click(collapseButtons[1]);

            expect(screen.queryByText('Information:')).not.toBeInTheDocument();
            expect(screen.queryByText('Positions:')).not.toBeInTheDocument();
        });

        it('Only displays bottom text button if not collapsed', () => {
            renderElectionWithIssueAndCandidate();

            let collapseButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4' });
            expect(collapseButtons).toHaveLength(2);

            userEvent.click(collapseButtons[0]);

            collapseButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4' });
            expect(collapseButtons).toHaveLength(1);
        });
    });

    describe('Collapses information section properly', () => {
        it('Collapses with top image button', () => {
            renderElectionWithIssueAndCandidate();

            expect(screen.queryByText('Education:')).toBeInTheDocument();
            expect(screen.queryByText('Campaign Website:')).toBeInTheDocument();
            expect(screen.queryByText('Facebook Page:')).toBeInTheDocument();
            expect(screen.queryByText('Twitter Profile:')).toBeInTheDocument();
            expect(screen.queryByText('Video Link:')).toBeInTheDocument();

            const collapseInfoButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4 Information' });
            userEvent.click(collapseInfoButtons[0]);

            expect(screen.queryByText('Education:')).not.toBeInTheDocument();
            expect(screen.queryByText('Campaign Website:')).not.toBeInTheDocument();
            expect(screen.queryByText('Facebook Page:')).not.toBeInTheDocument();
            expect(screen.queryByText('Twitter Profile:')).not.toBeInTheDocument();
            expect(screen.queryByText('Video Link:')).not.toBeInTheDocument();
        });

        it('Collapses with bottom text button', () => {
            renderElectionWithIssueAndCandidate();

            expect(screen.queryByText('Education:')).toBeInTheDocument();
            expect(screen.queryByText('Campaign Website:')).toBeInTheDocument();
            expect(screen.queryByText('Facebook Page:')).toBeInTheDocument();
            expect(screen.queryByText('Twitter Profile:')).toBeInTheDocument();
            expect(screen.queryByText('Video Link:')).toBeInTheDocument();

            const collapseInfoButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4 Information' });
            userEvent.click(collapseInfoButtons[1]);

            expect(screen.queryByText('Education:')).not.toBeInTheDocument();
            expect(screen.queryByText('Campaign Website:')).not.toBeInTheDocument();
            expect(screen.queryByText('Facebook Page:')).not.toBeInTheDocument();
            expect(screen.queryByText('Twitter Profile:')).not.toBeInTheDocument();
            expect(screen.queryByText('Video Link:')).not.toBeInTheDocument();
        });

        it('Only displays bottom text button if info is not collapsed', () => {
            renderElectionWithIssueAndCandidate();

            let collapseInfoButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4 Information' });
            expect(collapseInfoButtons).toHaveLength(2);

            userEvent.click(collapseInfoButtons[0]);

            collapseInfoButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4 Information' });
            expect(collapseInfoButtons).toHaveLength(1);
        });
    });

    describe('Collapses positions properly', () => {
        it('Collapses with top image button', () => {
            renderElectionWithIssueAndCandidate(2);

            expect(screen.queryAllByText('Position:')).toHaveLength(3);

            const collapsePositionsButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4 Positions' });
            userEvent.click(collapsePositionsButtons[0]);

            expect(screen.queryAllByText('Position:')).toHaveLength(0);
        });

        it('Collapses with bottom text button', () => {
            renderElectionWithIssueAndCandidate(2);

            expect(screen.queryAllByText('Position:')).toHaveLength(3);

            const collapsePositionsButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4 Positions' });
            userEvent.click(collapsePositionsButtons[1]);

            expect(screen.queryAllByText('Position:')).toHaveLength(0);
        });

        it('Only displays bottom text button if info is not collapsed', () => {
            renderElectionWithIssueAndCandidate();

            let collapsePositionsButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4 Positions' });
            expect(collapsePositionsButtons).toHaveLength(2);

            userEvent.click(collapsePositionsButtons[0]);

            collapsePositionsButtons = screen.getAllByRole('button', { name: 'Collapse Candidate #4 Positions' });
            expect(collapsePositionsButtons).toHaveLength(1);
        });
    });
});

it('Deletes a candidate properly', () => {
    renderElectionWithIssueAndCandidate();

    expect(screen.queryByText('Candidate #4')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Delete Candidate #4' }));
    userEvent.click(screen.getByRole('button', { name: 'Yes' }));

    expect(screen.queryByText('Candidate #4')).not.toBeInTheDocument();
});

it('Cancels a delete properly', () => {
    renderElectionWithIssueAndCandidate();

    expect(screen.queryByText('Candidate #4')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Delete Candidate #4' }));
    userEvent.click(screen.getByRole('button', { name: 'No' }));

    expect(screen.queryByText('Candidate #4')).toBeInTheDocument();
});
