import { Ballot, Candidate, Election, Issue, Race } from './Data';

const generateCandidate = (id: number, issues: Issue[], party: string): Candidate => {
    const positions = issues.map((issue) => {
        return {
            issueId: issue.issueId,
            position: `c${id}-i${issue.issueId}`
        };
    });

    return {
        candidateId: id,
        candidateName: `Candidate #${id}`,
        party,
        positions,
        education: 'Some School',
        campaignWebsite: 'http://google.com',
        facebook: 'https://facebook.com',
        twitter: 'http://twitter.com',
        video: 'https://youtube.com'
    };
};

const generateNullCandidate = (id: number, issues: Issue[], party?: string): Candidate => {
    const positions = issues.map((issue) => {
        return {
            issueId: issue.issueId,
            position: null
        };
    });

    return {
        candidateId: id,
        candidateName: `Candidate #${id}`,
        party: party ? party : null,
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
            issueName: `Issue #${i}`,
            question: `Issue question #${i}`
        });
    }

    return issues;
};

const generateRace = (id: number, issues: Issue[], candidates: Candidate[]): Race => {
    return {
        raceId: id,
        raceName: `Race #${id}`,
        description: `Race description #${id}`,
        issues,
        candidates
    };
};

const generateElection = (name: string, ballots: Ballot[]): Election => {
    return { electionName: name, ballots };
};

const generateBallot = (id: number, races: Race[], name?: string): Ballot => {
    return {
        ballotId: id,
        ballotName: name ? name : `Ballot #${id}`,
        races
    };
};

export { generateElection, generateBallot, generateRace, generateIssues, generateCandidate, generateNullCandidate };