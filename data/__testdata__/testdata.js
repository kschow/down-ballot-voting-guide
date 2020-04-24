const generateCandidate = (id, party, issues) => {
    const positions = issues.map((issue) => {
        return {
            'issueId': issue.issueId,
            'position': `c${id}-i${issue.issueId}`
        };
    });

    return {
        'candidateId': id,
        'candidateName': `candidate ${id}`,
        party,
        positions,
        'education': 'Some School',
        'campaignWebsite': 'http://google.com',
        'facebook': 'https://facebook.com',
        'twitter': 'http://twitter.com',
        'video': 'https://youtube.com'
    };
};

const generateNullCandidate = (id, party, issues) => {
    const positions = issues.map((issue) => {
        return {
            'issueId': issue.issueId,
            'position': null
        };
    });

    return {
        'candidateId': id,
        'candidateName': `candidate ${id}`,
        party,
        positions,
        'education': null,
        'campaignWebsite': null,
        'facebook': null,
        'twitter': null,
        'video': null
    };
};

const generateIssues = (count) => {
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

const generateRace = (id, issues, candidates) => {
    return {
        raceId: id,
        raceName: `race ${id}`,
        description: `race description ${id}`,
        issues,
        candidates
    };
};

const generateElection = (type, party, races) => {
    return { type, party, races };
};

export { generateElection, generateRace, generateIssues, generateCandidate, generateNullCandidate };
