import { render } from '@testing-library/react';
import React from 'react';
import {
    generateCandidate,
    generateIssues,
    generateNullCandidate,
    generateRace
} from '../../../data/__testdata__/testdata';
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

    const component = <RaceGuide race={race} issueOrder={issueOrder} shufflePositions={false} />;
    const { queryByText } = render(component);

    expect(queryByText('c1-i2')).toBeTruthy();
    expect(queryByText('c3-i2')).toBeTruthy();
    expect(queryByText('c5-i2')).toBeTruthy();

    expect(queryByText('c1-i0')).toBeFalsy();
    expect(queryByText('c3-i0')).toBeFalsy();
    expect(queryByText('c5-i0')).toBeFalsy();

    expect(queryByText('c1-i1')).toBeFalsy();
    expect(queryByText('c3-i1')).toBeFalsy();
    expect(queryByText('c5-i1')).toBeFalsy();
});
