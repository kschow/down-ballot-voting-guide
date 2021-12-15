import React, { FC, useState } from 'react';
import UpArrow from './icons/up-arrow.svg';
import DownArrow from './icons/down-arrow.svg';

type CollapseReturn = [ boolean, FC ];

const useCollapsed = (name: string): CollapseReturn => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const CollapseButton = () => {
        return (
            <button onClick={toggleCollapsed}>
                <img
                    src={collapsed ? UpArrow : DownArrow}
                    alt={`Collapse ${name}`}
                    title={`Collapse ${name}`}
                />
            </button>
        );
    };

    return [collapsed, CollapseButton] as CollapseReturn;
};

export default useCollapsed;
