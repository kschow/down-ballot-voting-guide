import React, { FC } from 'react';
import './App.css';
import ElectionBuilder from './components/ElectionBuilder';
import { IdProvider } from './IdContext';

const App:FC = () => {
    return (
        <IdProvider>
            <ElectionBuilder />
        </IdProvider>
    );
};

export default App;
