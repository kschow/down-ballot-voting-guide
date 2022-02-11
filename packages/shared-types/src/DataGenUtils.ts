import { Ballot, Candidate, County, Election, Issue, Race } from './Data';

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

const generateIssue = (id: number): Issue => {
    return {
        issueId: id,
        issueName: `Issue #${id}`,
        question: `Issue question #${id}`
    };
};

const generateIssues = (count: number): Issue[] => {
    const issues = [];
    for (let id = 0; id < count; id++) {
        issues.push(generateIssue(id));
    }

    return issues;
};

const generateRace = (id: number, issues?: Issue[], candidates?: Candidate[]): Race => {
    return {
        raceId: id,
        raceName: `Race #${id}`,
        description: `Race description #${id}`,
        county: County.ALL,
        precincts: [],
        issues: issues ? issues : [],
        candidates: candidates ? candidates : []
    };
};

const generateElection = (name: string, ballots: Ballot[]): Election => {
    return {
        electionName: name,
        ballots
    };
};

const generateBallot = (id: number, races?: Race[], name?: string): Ballot => {
    return {
        ballotId: id,
        ballotName: name ? name : `Ballot #${id}`,
        races: races ? races : []
    };
};

export {
    generateElection,
    generateBallot,
    generateRace,
    generateIssue,
    generateIssues,
    generateCandidate,
    generateNullCandidate
};
