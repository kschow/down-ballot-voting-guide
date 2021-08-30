import { Ballot, Candidate, Election, Issue, Race } from './Data';

const generateCandidate = (id: number, party: string, issues: Issue[]): Candidate => {
    const positions = issues.map((issue) => {
        return {
            issueId: issue.issueId,
            position: `c${id}-i${issue.issueId}`
        };
    });

    return {
        candidateId: id,
        candidateName: `candidate ${id}`,
        party,
        positions,
        education: 'Some School',
        campaignWebsite: 'http://google.com',
        facebook: 'https://facebook.com',
        twitter: 'http://twitter.com',
        video: 'https://youtube.com'
    };
};

const generateNullCandidate = (id: number, party: string, issues: Issue[]): Candidate => {
    const positions = issues.map((issue) => {
        return {
            issueId: issue.issueId,
            position: null
        };
    });

    return {
        candidateId: id,
        candidateName: `candidate ${id}`,
        party,
        positions,
        education: null,
        campaignWebsite: null,
        facebook: null,
        twitter: null,
        video: null
    };
};

const generateIssues = (count: number): Issue[] => {
    const issues = [];
    // eslint-disable-next-line id-length
    for (let i = 0; i < count; i++) {
        issues.push({
            issueId: i,
            issueName: `issue ${i}`,
            question: `issue question ${i}`
        });
    }

    return issues;
};

const generateRace = (id: number, issues: Issue[], candidates: Candidate[]): Race => {
    return {
        raceId: id,
        raceName: `race ${id}`,
        description: `race description ${id}`,
        issues,
        candidates
    };
};

const generateElection = (name: string, ballots: Ballot[]): Election => {
    return { name, ballots };
};

const generateBallot = (id: number, name: string, races: Race[]): Ballot => {
    return { id, name, races };
};

export { generateElection, generateBallot, generateRace, generateIssues, generateCandidate, generateNullCandidate };
