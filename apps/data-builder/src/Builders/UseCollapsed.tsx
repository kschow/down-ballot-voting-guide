import React, { FC, useState } from 'react';
import styles from './Builders.module.scss';
import UpArrow from './icons/up-arrow.svg';
import DownArrow from './icons/down-arrow.svg';

type CollapseReturn = [ boolean, FC<CollapseButtonProps> ];

enum CollapseButtonType {
    IMAGE,
    TEXT
}

type CollapseButtonProps = {
    type: CollapseButtonType;
};

const useCollapsed = (name: string): CollapseReturn => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const CollapseButton: FC<CollapseButtonProps> = ({ type }) => {
        const buttonContents = () => {
            switch (type) {
            case CollapseButtonType.IMAGE:
                return (
                    <img
                        src={collapsed ? UpArrow : DownArrow}
                        alt={`Collapse ${name}`}
                        title={`Collapse ${name}`}
                    />
                );
            case CollapseButtonType.TEXT:
                return `Collapse ${name}`;
            default:
                throw new Error('Unsupported collapse button type');
            }
        };

        const buttonClass = () => {
            return `${type === CollapseButtonType.IMAGE ? styles.Image : ''}`;
        };

        return (
            <button className={buttonClass()} onClick={toggleCollapsed}>
                {buttonContents()}
            </button>
        );
    };

    return [collapsed, CollapseButton] as CollapseReturn;
};

export { CollapseButtonType };
export default useCollapsed;
