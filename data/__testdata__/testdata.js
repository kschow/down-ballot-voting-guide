const generateCandidate = (id, party, issues) => {
    const positions = issues.map((issue) => {
        return {
            'issueId': issue.issueId,
            'position': issue.issueId.toString()
        };
    });

    return {
        'candidateId': id,
        'candidateName': id.toString(),
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
        'candidateName': id.toString(),
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
            issueName: i.toString(),
            question: i.toString()
        });
    }

    return issues;
};

const generateRace = (id, issues, candidates) => {
    return {
        raceId: id,
        raceName: id.toString(),
        description: id.toString(),
        issues,
        candidates
    };
};

export { generateRace, generateIssues, generateCandidate, generateNullCandidate };
