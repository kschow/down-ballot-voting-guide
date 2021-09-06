import React, { FC } from 'react';
import ElectionBuilder from './Builders/ElectionBuilder';
import { IdProvider } from './IdContext';
import { EditableProvider } from './Fields/EditableContext';

const App:FC = () => {
    return (
        <IdProvider>
            <EditableProvider>
                <ElectionBuilder />
            </EditableProvider>
        </IdProvider>
    );
};

export default App;
