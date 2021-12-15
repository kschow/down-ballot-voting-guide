import { Election } from '@dbvg/shared-types';

const getHighestIdInElection = (election: Election): number => {
    let maxId = 0;

    election.ballots.forEach((ballot) => {
        if (ballot.ballotId > maxId) {
            maxId = ballot.ballotId;
        }
        ballot.races.forEach((race) => {
            if (race.raceId > maxId) {
                maxId = race.raceId;
            }
            race.candidates.forEach((candidate) => {
                if (candidate.candidateId > maxId) {
                    maxId = candidate.candidateId;
                }
            });
            race.issues.forEach((issue) => {
                if (issue.issueId > maxId) {
                    maxId = issue.issueId;
                }
            });
        });
    });

    return maxId;
};

export default getHighestIdInElection;
