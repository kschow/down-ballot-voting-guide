export type Issue = {
    issueId: number;
    issueName: string;
    question: string;
}

export type CandidatePosition = {
    issueId: number;
    position: string;
}

export type Candidate = {
    candidateId: number;
    candidateName: string;
    party: string;
    positions: CandidatePosition[];
    education: string;
    campaignWebsite: string;
    facebook: string;
    twitter: string;
    video: string;
}

export type Race = {
    raceId: number;
    raceName: string;
    description: string;
    issues: Issue[];
    candidates: Candidate[];
}

export type Election = {
    type: string;
    party: string;
    races: Race[];
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

export type CandidateScore = {
    candidateId: number;
    score: number;
}

export type IssueScore = {
    issueId: number;
    candidates: CandidateScore[];
}

export type CandidateResult = {
    issueName: string;
    score: number;
}

export type Result = {
    candidateId: number;
    candidateName: string;
    total: number;
    issues: CandidateResult[];
}
