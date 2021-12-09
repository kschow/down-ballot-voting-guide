import React, { FC, useState } from 'react';
import { Election } from '@dbvg/shared-types';
import ElectionBuilder from '../Builders/ElectionBuilder';
import { IdProvider } from '../Builders/IdContext';
import { EditableProvider } from '../Fields/EditableContext';
import getHighestIdInElection from './Utils/GetHighestIdInElection';
import Home from './Home';

const App:FC = () => {
    const [election, setElection] = useState({} as Election);
    const [started, setStarted] = useState(false);

    const startBuilding = () => {
        setStarted(true);
    };

    return (
        <div>
            {
                !started &&
                <Home
                    setElection={setElection}
                    startBuilding={startBuilding}
                />
            }
            {
                started &&
                <IdProvider initialId={getHighestIdInElection(election)}>
                    <EditableProvider>
                        <ElectionBuilder election={election} />
                    </EditableProvider>
                </IdProvider>
            }
        </div>
    );
};

export default App;
