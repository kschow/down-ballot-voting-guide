export type Election = {
    electionName: string;
    ballots: Ballot[];
}

export type Ballot = {
    ballotId: number;
    ballotName: string;
    races: Race[];
}

export type Race = {
    raceId: number;
    raceName: string;
    description: string;
    // eslint-disable-next-line no-warning-comments
    // todo: remove optional here after updating json in main-app
    county?: County;
    precincts?: number|string[];
    issues: Issue[];
    candidates: Candidate[];
}

export enum County {
    ALL = 'ALL',
    TRAVIS = 'TRAVIS',
    WILLIAMSON = 'WILLIAMSON'
}

export type Issue = {
    issueId: number;
    issueName: string;
    question: string;
}

export type Candidate = {
    candidateId: number;
    candidateName: string;
    party: string | null;
    positions: CandidatePosition[];
    education: string | null;
    campaignWebsite: string | null;
    facebook: string | null;
    twitter: string | null;
    video: string | null;
}

export type CandidatePosition = {
    issueId: number;
    position: string | null;
}

export type IssuePosition = {
    candidateId: number;
    position: string;
}

export type IssuePositions = {
    issueId: number;
    issueName: string;
    question: string;
    positions: IssuePosition[];
}
