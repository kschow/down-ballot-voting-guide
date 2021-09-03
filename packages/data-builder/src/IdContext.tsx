import React, { createContext, FC, useContext, useState } from 'react';

type IdGenerator = {
    getNewId: () => number
}

const IdContext = createContext<IdGenerator>(null);

const IdProvider:FC = ({ children }) => {
    const [id, setId] = useState(1);

    const getNewId = () => {
        setId(id + 1);
        return id;
    };

    return <IdContext.Provider value={
        {
            getNewId
        }
    }>{children}</IdContext.Provider>;
};

const useIdGenerator = ():IdGenerator => {
    const context = useContext(IdContext);

    // eslint-disable-next-line no-undefined
    if (context === null || context === undefined) {
        throw new Error('Id generator must be used within an IdProvider');
    }
    return context;
};

export { IdProvider, useIdGenerator };
