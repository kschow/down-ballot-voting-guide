import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import {
    generateCandidate,
    generateIssues,
    generateNullCandidate,
    generateRace
} from '../../../data/__testdata__/testdata';
import Guide from '../../../data/Guide';
import RaceGuide from '../RaceGuide';

const issues = generateIssues(3);
const candidate1 = generateCandidate(1, 'democrat', issues);
const candidate2 = generateCandidate(3, 'democrat', issues);
const candidate3 = generateCandidate(5, 'democrat', issues);
const candidate4 = generateNullCandidate(7, 'democrat', issues);
const candidates = [candidate1, candidate2, candidate3, candidate4];

const race = generateRace(12, issues, candidates);

it('displays the first set of answers', () => {
    const issueOrder = [2, 0, 1];
    const guide = new Guide(race, issueOrder, false);

    const component = <RaceGuide guide={guide} />;
    const { queryByText } = render(component);

    expect(queryByText('c1-i2')).toBeInTheDocument();
    expect(queryByText('c3-i2')).toBeInTheDocument();
    expect(queryByText('c5-i2')).toBeInTheDocument();

    expect(queryByText('c1-i0')).not.toBeInTheDocument();
    expect(queryByText('c3-i0')).not.toBeInTheDocument();
    expect(queryByText('c5-i0')).not.toBeInTheDocument();

    expect(queryByText('c1-i1')).not.toBeInTheDocument();
    expect(queryByText('c3-i1')).not.toBeInTheDocument();
    expect(queryByText('c5-i1')).not.toBeInTheDocument();
});

it('selecting an answer changes the style to selected and only one can be selected at a time', () => {
    const issueOrder = [1, 0, 2];
    const guide = new Guide(race, issueOrder, false);

    const component = <RaceGuide guide={guide} />;
    const { getByText } = render(component);

    const candidateOneAnswer = getByText('c1-i1');
    const candidateTwoAnswer = getByText('c3-i1');

    expect(candidateOneAnswer).not.toHaveClass('selected');
    expect(candidateTwoAnswer).not.toHaveClass('selected');

    fireEvent.click(candidateOneAnswer);
    expect(candidateOneAnswer).toHaveClass('selected');
    expect(candidateTwoAnswer).not.toHaveClass('selected');

    fireEvent.click(candidateTwoAnswer);
    expect(candidateOneAnswer).not.toHaveClass('selected');
    expect(candidateTwoAnswer).toHaveClass('selected');
});

it('continuing to the next issue is disabled until an answer is selected', () => {
    const issueOrder = [2, 0, 1];
    const guide = new Guide(race, issueOrder, false);

    const component = <RaceGuide guide={guide} />;
    const { getByText } = render(component);

    const continueButtonLink = getByText('Continue »');
    expect(continueButtonLink).toBeDisabled();

    fireEvent.click(getByText('c3-i2'));
    expect(continueButtonLink).not.toBeDisabled();
});

it('clicking the continue button after selecting an answer moves you onto the next set of answers', () => {
    const issueOrder = [2, 0, 1];
    const guide = new Guide(race, issueOrder, false);

    const component = <RaceGuide guide={guide} />;
    const { getByText, queryByText } = render(component);

    const continueButtonLink = getByText('Continue »');
    fireEvent.click(getByText('c3-i2'));
    fireEvent.click(continueButtonLink);

    expect(queryByText('c1-i0')).toBeInTheDocument();
    expect(queryByText('c3-i0')).toBeInTheDocument();
    expect(queryByText('c5-i0')).toBeInTheDocument();

    expect(queryByText('c1-i2')).not.toBeInTheDocument();
    expect(queryByText('c3-i2')).not.toBeInTheDocument();
    expect(queryByText('c5-i2')).not.toBeInTheDocument();

    expect(continueButtonLink).toBeDisabled();
});

it('when you get to the last issue, the button says, "Finish" instead of "Continue"', () => {
    const issueOrder = [1, 0, 2];
    const guide = new Guide(race, issueOrder, false);

    const component = <RaceGuide guide={guide} />;
    const { getByText, queryByText } = render(component);

    const continueButtonLink = getByText('Continue »');
    fireEvent.click(getByText('c1-i1'));
    fireEvent.click(continueButtonLink);
    fireEvent.click(getByText('c1-i0'));
    fireEvent.click(continueButtonLink);

    expect(queryByText('c1-i2')).toBeInTheDocument();
    expect(queryByText('Continue »')).not.toBeInTheDocument();
    expect(queryByText('Finish »')).toBeInTheDocument();
});
