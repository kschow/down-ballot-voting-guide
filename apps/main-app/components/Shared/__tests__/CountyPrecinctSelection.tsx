import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectedCandidatesProvider } from '../../../context/SelectedCandidatesContext';
import CountyPrecinctSelection from '../CountyPrecinctSelection';
import { County } from '@dbvg/shared-types';

const renderCountyPrecinctSelection = () => {
    render(
        <SelectedCandidatesProvider>
            <CountyPrecinctSelection
                // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
                continueFn={() => {}}
            />
        </SelectedCandidatesProvider>
    );
};

const getSelectedCandidatesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('selectedCandidates'));
};

it('Updates county and precinct properly', () => {
    renderCountyPrecinctSelection();

    const continueButtonLink = screen.getByRole('button', { name: /Continue/u });
    expect(continueButtonLink).toBeDisabled();

    const countySelect = screen.getByRole('combobox', { name: 'Select a County:' });
    userEvent.selectOptions(countySelect, ['TRAVIS']);

    const precinctInput = screen.getByLabelText(/Precinct:/u);
    userEvent.type(precinctInput, '125');

    expect(continueButtonLink).not.toBeDisabled();
    act(() => {
        userEvent.click(continueButtonLink);
    });

    const selected = getSelectedCandidatesFromLocalStorage();
    expect(selected.county).toBe(County.TRAVIS);
    expect(selected.precinct).toBe(125);
});

it('Does not allow continuing without inputting a county', () => {
    renderCountyPrecinctSelection();
});

it('Does not allow continuing without inputting a precinct', () => {
    renderCountyPrecinctSelection();
});
