import { FunctionComponent } from 'react';
import global from './Global.module.scss';

type ElectedOfficialCardProps = {
    name: string;
    description: string;
}

const ElectedOfficialCard: FunctionComponent<ElectedOfficialCardProps> = ({ name, description }) => (
    <div className={global.card}>
        <div className={global.title}>
            <strong>{name}</strong>
        </div>
        {description}
    </div>
);

export default ElectedOfficialCard;
