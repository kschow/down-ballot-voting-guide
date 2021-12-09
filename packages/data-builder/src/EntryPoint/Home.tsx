import React, { FC } from 'react';
import { Election, ElectionSchema } from '@dbvg/shared-types';
import Ajv from 'ajv';

type HomeProps = {
    setElection: (election: Election) => void;
    startBuilding: () => void;
};

const readmeLink =
    'https://github.com/kschow/down-ballot-voting-guide/blob/master/packages/data-builder/README.md';

const Home:FC<HomeProps> = ({ setElection, startBuilding }) => {
    // eslint-disable-next-line no-undefined
    const hasPreviouslyStarted = localStorage.getItem('election') !== undefined;

    const loadFromLocalStorage = () => {
        const election = JSON.parse(localStorage.getItem('election')) as Election;
        setElection(election);
        startBuilding();
    };

    const startNewElection = () => {
        setElection({
            electionName: '',
            ballots: []
        } as Election);
        startBuilding();
    };

    const launchLoadDialog = () => {
        const loadFileInput = document.getElementById('loadFileInput') as HTMLInputElement;
        loadFileInput.click();
    };

    const loadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files[0]) {
            const fileContents = await event.currentTarget.files[0].text();

            const contentsAsJson = JSON.parse(fileContents) as Election;

            const ajv = new Ajv();
            if (ajv.validate(ElectionSchema, contentsAsJson)) {
                setElection(contentsAsJson);
                startBuilding();
            }
        }
    };

    return (
        <>
            <h1>Data Builder</h1>
            <section>
                <p>Welcome to the DBVG Data Builder.</p>
                <p>
                    The purpose of this application is to generate valid data for the
                    Down Ballot Voting Guide.
                </p>
                <p>
                    For more information on how to use this and what various things mean,
                    please refer to the <a href={readmeLink}>README</a>.
                </p>
            </section>
            <hr />
            <section>
                {
                    hasPreviouslyStarted &&
                    <div>
                        <p>
                            It looks like you have previously used this application and have saved information.
                            Would you like to continue from where you left off?
                        </p>
                        <button onClick={loadFromLocalStorage}>Continue from last saved</button>
                    </div>
                }
                <div>
                    <button onClick={launchLoadDialog}>Load from file</button>
                    <input
                        id="loadFileInput"
                        type="file"
                        accept="application/json"
                        onChange={loadFile}
                    />
                </div>
                <div>
                    <button onClick={startNewElection}>Start new election</button>
                </div>
            </section>
        </>
    );
};

export default Home;
