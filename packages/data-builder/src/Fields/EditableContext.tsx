/* eslint-disable no-undefined */
import React, { createContext, FC, useContext, useState } from 'react';

type EditableContext = {
    isEditable: boolean,
    toggleEditable: () => void
}

const EditableContext = createContext<EditableContext>(undefined);

const EditableProvider: FC = ({ children }) => {
    const [isEditable, setIsEditable] = useState(true);

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    };

    return <EditableContext.Provider value={{
        isEditable,
        toggleEditable
    }}>{children}</EditableContext.Provider>;
};

const useEditable = ():EditableContext => {
    const context = useContext(EditableContext);

    if (context === undefined) {
        throw new Error('Editable Context must be used within an EditableProvider');
    }

    return context;
};

export { EditableProvider, useEditable };
