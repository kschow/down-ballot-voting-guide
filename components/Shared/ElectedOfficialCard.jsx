import * as PropTypes from 'prop-types';
import React from 'react';
import global from './Global.module.scss';

const ElectedOfficialCard = ({ name, description }) => (
    <div className={global.card}>
        <div className={global.title}>
            <strong>{name}</strong>
        </div>
        {description}
    </div>
);

ElectedOfficialCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};

export default ElectedOfficialCard;
