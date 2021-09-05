import React, { FC } from 'react';
import ElectionBuilder from './Builders/ElectionBuilder';
import { IdProvider } from './IdContext';

const App:FC = () => {
    return (
        <IdProvider>
            <ElectionBuilder />
        </IdProvider>
    );
};

export default App;
