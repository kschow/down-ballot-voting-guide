import React, { FC } from 'react';
import { Race } from '@dbvg/shared-types/src';
import styles from './Builders.module.scss';
import EditableField from '../Fields/EditableField';
import curriedUpdateAttribute from './Utils/CurriedUpdateAttribute';

type RaceBuilderProps = {
    race: Race,
    updateRace: (race: Race) => void,
};

const RaceBuilder: FC<RaceBuilderProps> = ({ race, updateRace }) => {
    const updateValueForAttribute = curriedUpdateAttribute(updateRace)(race);

    return (
        <div className={styles.builder}>
            <EditableField
                name={`Race #${race.raceId} Name`}
                label="Race Name:"
                data={race.raceName}
                updateField={updateValueForAttribute('raceName')}
            />
            <EditableField
                name={`Race #${race.raceId} Description`}
                label="Position Description:"
                data={race.description}
                updateField={updateValueForAttribute('description')}
            />
        </div>
    );
};

export default RaceBuilder;
