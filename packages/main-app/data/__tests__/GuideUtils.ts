import {
    generateCandidate,
    generateIssues,
    generateNullCandidate,
    generateRace
} from '@dbvg/shared-types';
import { getPositionsForIssue } from '../GuideUtils';

describe('getPositionsForIssue', () => {
    it('getPositionsForIssue throws an error if any issue isn\'t found', () => {
        const issues = generateIssues(5);
        const candidate1 = generateCandidate(1, issues, 'democrat');

        const candidates = [candidate1];

        const race = generateRace(15, issues, candidates);
        expect(() => {
            getPositionsForIssue(race, 5);
        }).toThrow('Issue 5 not found for race');
    });

    it('getPositionsForIssue gets all positions for an issue', () => {
        const expectedPositionsForIssue = {
            issueId: 1,
            issueName: 'Issue #1',
            question: 'Issue question #1',
            positions: [
                {
                    candidateId: 1,
                    position: 'c1-i1'
                },
                {
                    candidateId: 2,
                    position: 'c2-i1'
                },
                {
                    candidateId: 3,
                    position: null
                }
            ]
        };

        const issues = generateIssues(3);
        const candidate1 = generateCandidate(1, issues, 'democrat');
        const candidate2 = generateCandidate(2, issues, 'democrat');
        const candidate3 = generateNullCandidate(3, issues, 'democrat');

        const candidates = [
            candidate1,
            candidate2,
            candidate3
        ];

        const race = generateRace(10, issues, candidates);
        const positionsByIssues = getPositionsForIssue(race, 1);

        expect(positionsByIssues).toStrictEqual(expectedPositionsForIssue);
    });
});
