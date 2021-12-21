import { createContext, FC, useContext, useState } from 'react';

type IdProviderProps = {
    initialId?: number;
}

type IdGenerator = {
    getNewId: () => number
}

const IdContext = createContext<IdGenerator>(null);

const IdProvider:FC<IdProviderProps> = ({ initialId, children }) => {
    const [id, setId] = useState(initialId ? initialId + 1 : 1);

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
