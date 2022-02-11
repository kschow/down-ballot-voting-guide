import { IdProvider } from '../IdContext';
import { EditableProvider } from '../../Fields/EditableContext';
import { render, screen } from '@testing-library/react';
import ElectionBuilder from '../ElectionBuilder';
import userEvent from '@testing-library/user-event';

const renderElectionWithRace = () => {
    render(
        <IdProvider>
            <EditableProvider>
                <ElectionBuilder />
            </EditableProvider>
        </IdProvider>
    );
    userEvent.click(screen.getByRole('button', { name: 'Add Ballot' }));
    userEvent.click(screen.getByRole('button', { name: /Add Race/u }));
};

it('Updates race name properly', () => {
    renderElectionWithRace();

    userEvent.click(screen.getByRole('button', { name: 'Edit (Race #2 Name)' }));
    const raceNameData = screen.getByLabelText(/Race Name/u);
    userEvent.clear(raceNameData);
    userEvent.type(raceNameData, 'New Race');
    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('New Race')).toBeInTheDocument();
});

it('Updates description properly', () => {
    renderElectionWithRace();

    userEvent.click(screen.getByRole('button', { name: 'Edit (Race #2 Description)' }));
    const descriptionData = screen.getByLabelText(/Position Description/u);
    userEvent.clear(descriptionData);
    userEvent.type(descriptionData, 'new description');
    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('new description')).toBeInTheDocument();
});

it('Displays/Updates county properly', () => {
    renderElectionWithRace();

    expect(screen.queryByText('ALL')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Edit (Race #2 County)' }));

    expect(screen.queryByText('ALL')).toBeInTheDocument();
    expect(screen.queryByText('TRAVIS')).toBeInTheDocument();
    expect(screen.queryByText('WILLIAMSON')).toBeInTheDocument();

    userEvent.selectOptions(screen.getByRole('combobox', { name: 'County:' }), ['TRAVIS']);
    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('ALL')).not.toBeInTheDocument();
    expect(screen.queryByText('TRAVIS')).toBeInTheDocument();
    expect(screen.queryByText('WILLIAMSON')).not.toBeInTheDocument();
});

it('Updates precincts properly', () => {
    renderElectionWithRace();

    expect(screen.queryByText('[]')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Edit (Race #2 Precincts)' }));
    const precincts = screen.getByLabelText(/Precincts:/u);
    userEvent.clear(precincts);
    userEvent.type(precincts, '1,2,3, 4, 5');
    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('[1,2,3,4,5]')).toBeInTheDocument();
});

describe('Adds an issue to a race properly', () => {
    it('Adds a blank issue to a race properly', () => {
        renderElectionWithRace();

        userEvent.click(screen.getByRole('button', { name: 'Add Issue to Race #2' }));
        expect(screen.queryByText('Issue #3')).toBeInTheDocument();
    });

    it('Adds a position to every candidate on the race', () => {
        renderElectionWithRace();

        const addCandidateButton = screen.getByRole('button', { name: 'Add Candidate to Race #2' });
        const addIssueButton = screen.getByRole('button', { name: 'Add Issue to Race #2' });
        userEvent.click(addCandidateButton);
        userEvent.click(addCandidateButton);

        expect(screen.queryAllByText(/Position:/u)).toHaveLength(0);
        userEvent.click(addIssueButton);
        expect(screen.queryAllByText(/Position:/u)).toHaveLength(2);
    });
});

describe('Adds a candidate to a race properly', () => {
    it('Adds a candidate without any positions if there are no issues on the race', () => {
        renderElectionWithRace();

        userEvent.click(screen.getByRole('button', { name: 'Add Candidate to Race #2' }));
        expect(screen.queryByText('Candidate #3')).toBeInTheDocument();
        expect(screen.queryByText(/Position:/u)).not.toBeInTheDocument();
    });

    it('Adds a candidate with positions for all issues on a race', () => {
        renderElectionWithRace();

        const addIssueButton = screen.getByRole('button', { name: 'Add Issue to Race #2' });
        const addCandidateButton = screen.getByRole('button', { name: 'Add Candidate to Race #2' });
        userEvent.click(addIssueButton);
        userEvent.click(addIssueButton);
        userEvent.click(addIssueButton);

        expect(screen.queryAllByText(/Position:/u)).toHaveLength(0);
        userEvent.click(addCandidateButton);
        expect(screen.queryAllByText(/Position:/u)).toHaveLength(3);
    });
});

describe('Collapses things correctly', () => {
    describe('Collapses the entire race correctly', () => {
        it('Collapses with top image button', () => {
            renderElectionWithRace();

            expect(screen.queryByText('Position Description:')).toBeInTheDocument();
            expect(screen.queryByText('County:')).toBeInTheDocument();
            expect(screen.queryByText('Precincts:')).toBeInTheDocument();
            expect(screen.queryByText('Add Issue to Race #2')).toBeInTheDocument();
            expect(screen.queryByText('Add Candidate to Race #2')).toBeInTheDocument();
            expect(screen.queryByText(/Issues:/u)).toBeInTheDocument();
            expect(screen.queryByText(/Candidates:/u)).toBeInTheDocument();

            const collapseRace = screen.getAllByRole('button', { name: 'Collapse Race #2' });
            userEvent.click(collapseRace[0]);

            expect(screen.queryByText('Position Description:')).not.toBeInTheDocument();
            expect(screen.queryByText('County:')).not.toBeInTheDocument();
            expect(screen.queryByText('Precincts:')).not.toBeInTheDocument();
            expect(screen.queryByText('Add Issue to Race #2')).not.toBeInTheDocument();
            expect(screen.queryByText('Add Candidate to Race #2')).not.toBeInTheDocument();
            expect(screen.queryByText(/Issues:/u)).not.toBeInTheDocument();
            expect(screen.queryByText(/Candidates:/u)).not.toBeInTheDocument();
        });

        it('Only displays bottom text button if not collapsed and if there are any issues/candidates', () => {
            renderElectionWithRace();

            userEvent.click(screen.getByRole('button', { name: 'Add Issue to Race #2' }));

            let collapseRaceButtons = screen.getAllByRole('button', { name: 'Collapse Race #2' });
            expect(collapseRaceButtons).toHaveLength(2);

            userEvent.click(collapseRaceButtons[0]);

            collapseRaceButtons = screen.getAllByRole('button', { name: 'Collapse Race #2' });
            expect(collapseRaceButtons).toHaveLength(1);
        });

        it('Collapses with bottom text button', () => {
            renderElectionWithRace();

            userEvent.click(screen.getByRole('button', { name: 'Add Issue to Race #2' }));

            expect(screen.queryByText('Position Description:')).toBeInTheDocument();
            expect(screen.queryByText('County:')).toBeInTheDocument();
            expect(screen.queryByText('Precincts:')).toBeInTheDocument();
            expect(screen.queryAllByText('Add Issue to Race #2')).toHaveLength(2);
            expect(screen.queryAllByText('Add Candidate to Race #2')).toHaveLength(2);
            expect(screen.queryByText(/Issues:/u)).toBeInTheDocument();
            expect(screen.queryByText(/Candidates:/u)).toBeInTheDocument();

            const collapseRace = screen.getAllByRole('button', { name: 'Collapse Race #2' });
            userEvent.click(collapseRace[1]);

            expect(screen.queryByText('Position Description:')).not.toBeInTheDocument();
            expect(screen.queryByText('County:')).not.toBeInTheDocument();
            expect(screen.queryByText('Precincts:')).not.toBeInTheDocument();
            expect(screen.queryAllByText('Add Issue to Race #2')).toHaveLength(0);
            expect(screen.queryAllByText('Add Candidate to Race #2')).toHaveLength(0);
            expect(screen.queryByText(/Issues:/u)).not.toBeInTheDocument();
            expect(screen.queryByText(/Candidates:/u)).not.toBeInTheDocument();
        });
    });

    describe('Collapses Issues correctly', () => {
        it('Collapses with top image button', () => {
            renderElectionWithRace();

            const addIssueButton = screen.getByRole('button', { name: 'Add Issue to Race #2' });
            userEvent.click(addIssueButton);
            userEvent.click(addIssueButton);

            expect(screen.queryByText(/Issues:/u)).toBeInTheDocument();
            expect(screen.queryAllByText('Issue Name:')).toHaveLength(2);

            const collapseRace = screen.getAllByRole('button', { name: 'Collapse Race #2 Issues' });
            userEvent.click(collapseRace[0]);

            expect(screen.queryByText(/Issues:/u)).toBeInTheDocument();
            expect(screen.queryAllByText('Issue Name:')).toHaveLength(0);
        });

        it('Collapses with bottom text button', () => {
            renderElectionWithRace();

            const addIssueButton = screen.getByRole('button', { name: 'Add Issue to Race #2' });
            userEvent.click(addIssueButton);
            userEvent.click(addIssueButton);

            expect(screen.queryByText(/Issues:/u)).toBeInTheDocument();
            expect(screen.queryAllByText('Issue Name:')).toHaveLength(2);

            const collapseRaceIssues = screen.getAllByRole('button', { name: 'Collapse Race #2 Issues' });
            userEvent.click(collapseRaceIssues[1]);

            expect(screen.queryByText(/Issues:/u)).toBeInTheDocument();
            expect(screen.queryAllByText('Issue Name:')).toHaveLength(0);
        });

        it('Only displays bottom text button if not collapsed', () => {
            renderElectionWithRace();

            let collapseRaceIssuesButtons = screen.getAllByRole('button', { name: 'Collapse Race #2 Issues' });
            expect(collapseRaceIssuesButtons).toHaveLength(2);

            userEvent.click(collapseRaceIssuesButtons[0]);

            collapseRaceIssuesButtons = screen.getAllByRole('button', { name: 'Collapse Race #2 Issues' });
            expect(collapseRaceIssuesButtons).toHaveLength(1);
        });
    });

    describe('Collapses Candidates correctly', () => {
        it('Collapses with top image button', () => {
            renderElectionWithRace();

            const addCandidateButton = screen.getByRole('button', { name: 'Add Candidate to Race #2' });
            userEvent.click(addCandidateButton);
            userEvent.click(addCandidateButton);

            expect(screen.queryByText(/Candidates:/u)).toBeInTheDocument();
            expect(screen.queryAllByText('Candidate Name:')).toHaveLength(2);

            const collapseRace = screen.getAllByRole('button', { name: 'Collapse Race #2 Candidates' });
            userEvent.click(collapseRace[0]);

            expect(screen.queryByText(/Candidates:/u)).toBeInTheDocument();
            expect(screen.queryAllByText('Candidate Name:')).toHaveLength(0);
        });

        it('Collapses with bottom text button', () => {
            renderElectionWithRace();

            const addCandidateButton = screen.getByRole('button', { name: 'Add Candidate to Race #2' });
            userEvent.click(addCandidateButton);
            userEvent.click(addCandidateButton);

            expect(screen.queryByText(/Candidates:/u)).toBeInTheDocument();
            expect(screen.queryAllByText('Candidate Name:')).toHaveLength(2);

            const collapseRace = screen.getAllByRole('button', { name: 'Collapse Race #2 Candidates' });
            userEvent.click(collapseRace[1]);

            expect(screen.queryByText(/Candidates:/u)).toBeInTheDocument();
            expect(screen.queryAllByText('Candidate Name:')).toHaveLength(0);
        });

        it('Only displays bottom text button if not collapsed', () => {
            renderElectionWithRace();

            let collapseRaceCandidatesButtons = screen.getAllByRole('button', { name: 'Collapse Race #2 Candidates' });
            expect(collapseRaceCandidatesButtons).toHaveLength(2);

            userEvent.click(collapseRaceCandidatesButtons[0]);

            collapseRaceCandidatesButtons = screen.getAllByRole('button', { name: 'Collapse Race #2 Candidates' });
            expect(collapseRaceCandidatesButtons).toHaveLength(1);
        });
    });
});

describe('Displays a second set of add buttons if there are any candidates or issues that work', () => {
    it('Displays a second set if there is an issue', () => {
        renderElectionWithRace();

        expect(screen.queryAllByText('Add Issue to Race #2')).toHaveLength(1);
        expect(screen.queryAllByText('Add Candidate to Race #2')).toHaveLength(1);

        userEvent.click(screen.getByRole('button', { name: 'Add Issue to Race #2' }));

        expect(screen.queryAllByText('Add Issue to Race #2')).toHaveLength(2);
        expect(screen.queryAllByText('Add Candidate to Race #2')).toHaveLength(2);

        const addIssueButtons = screen.getAllByRole('button', { name: 'Add Issue to Race #2' });
        userEvent.click(addIssueButtons[0]);
        expect(screen.queryAllByText('Issue Name:')).toHaveLength(2);
        userEvent.click(addIssueButtons[1]);
        expect(screen.queryAllByText('Issue Name:')).toHaveLength(3);
    });

    it('Displays a second set if there is a candidate', () => {
        renderElectionWithRace();

        expect(screen.queryAllByText('Add Issue to Race #2')).toHaveLength(1);
        expect(screen.queryAllByText('Add Candidate to Race #2')).toHaveLength(1);

        userEvent.click(screen.getByRole('button', { name: 'Add Candidate to Race #2' }));

        expect(screen.queryAllByText('Add Issue to Race #2')).toHaveLength(2);
        expect(screen.queryAllByText('Add Candidate to Race #2')).toHaveLength(2);

        const addCandidateButtons = screen.getAllByRole('button', { name: 'Add Candidate to Race #2' });
        userEvent.click(addCandidateButtons[0]);
        expect(screen.queryAllByText('Candidate Name:')).toHaveLength(2);
        userEvent.click(addCandidateButtons[1]);
        expect(screen.queryAllByText('Candidate Name:')).toHaveLength(3);
    });
});

it('Deletes a race properly', () => {
    renderElectionWithRace();

    expect(screen.queryByText('Race #2')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Delete Race #2' }));
    userEvent.click(screen.getByRole('button', { name: 'Yes' }));

    expect(screen.queryByText('Race #2')).not.toBeInTheDocument();
});

it('Cancels a delete properly', () => {
    renderElectionWithRace();

    expect(screen.queryByText('Race #2')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Delete Race #2' }));
    userEvent.click(screen.getByRole('button', { name: 'No' }));

    expect(screen.queryByText('Race #2')).toBeInTheDocument();
});
