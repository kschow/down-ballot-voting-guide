export type CandidateScore = {
    candidateId: number;
    score: number;
}

export type IssueScore = {
    issueId: number;
    candidates: CandidateScore[];
}

export type CandidateIssueResult = {
    issueName: string;
    position: string;
    score: number;
}

export type Result = {
    candidateId: number;
    candidateName: string;
    total: number;
    issues: CandidateIssueResult[];
}
