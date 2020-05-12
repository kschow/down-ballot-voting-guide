import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { generateCandidate, generateIssues, generateRace } from '../data/__testdata__/testdata';
import SingleSelect from '../pages/single-select';

// eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
window.HTMLElement.prototype.scrollIntoView = (): void => {};

const issues = generateIssues(2);
const candidate1 = generateCandidate(5, 'democrat', issues);
const candidate2 = generateCandidate(8, 'democrat', issues);
const candidates = [candidate1, candidate2];

const race1 = generateRace(256, issues, candidates);
const race2 = generateRace(100, issues, candidates);

const races = [race1, race2];

it('follows the flow from beginning to end', () => {
    const issueOrder = [0, 1];
    const component = <SingleSelect races={races} issueOrder={issueOrder}/>;

    const { getByText, queryByText } = render(component);

    // Expect description page to exist
    expect(queryByText('Single Select')).toBeInTheDocument();
    fireEvent.click(getByText('here'));

    // Expect race selection page to exist with shown races
    expect(queryByText('race 256')).toBeInTheDocument();
    expect(queryByText('race 100')).toBeInTheDocument();
    fireEvent.click(getByText('race 100'));

    // Run through the guide for selected race
    expect(queryByText('c5-i0')).toBeInTheDocument();
    expect(queryByText('c8-i0')).toBeInTheDocument();
    fireEvent.click(getByText('c5-i0'));
    fireEvent.click(getByText('Continue »'));

    expect(queryByText('c5-i1')).toBeInTheDocument();
    expect(queryByText('c8-i1')).toBeInTheDocument();
    fireEvent.click(getByText('c5-i1'));
    fireEvent.click(getByText('Finish »'));

    expect(queryByText('Results')).toBeInTheDocument();
});
