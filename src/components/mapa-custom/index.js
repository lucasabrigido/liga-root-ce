import Image from 'next/image';
import MapaImage from '@assets/images/mapa.jpg';

import styles from './mapa-custom.module.scss';
import { ROOT_FACTIONS_MAP_TOTAL } from '@utils/constants';
import Points from './points';
import { drawNumbers } from '@utils/functions';
import React from 'react';

const clareiras = [
    {
        top: '35px',
        left: '25px',
    },
    {
        top: '20px',
        left: '190px',
    },
    {
        top: '68px',
        left: '325px',
    },
    {
        top: '87px',
        left: '149px',
    },
    {
        top: '129px',
        left: '18px',
    },
    {
        top: '180px',
        left: '100px',
    },
    {
        top: '152px',
        left: '232px',
    },
    {
        top: '174px',
        left: '338px',
    },
    {
        top: '293px',
        left: '309px',
    },
    {
        top: '262px',
        left: '209px',
    },
    {
        top: '300px',
        left: '122px',
    },
    {
        top: '275px',
        left: '24px',
    }
]

const scaleFactor = 340 / 400;

const scaledClareiras = clareiras.map(pos => ({
    top: pos.top,
    left: `${Math.round(parseInt(pos.left) * scaleFactor)}px`
}));

const numbers = drawNumbers();
const Mapa = ({participants}) => {
    return (
        <div className={styles.mapa}>
            {participants.map((p, index) => {
                if (!p.faction) {
                    return null;
                }
                const Component = ROOT_FACTIONS_MAP_TOTAL[p.faction].component;
                return (
                    <React.Fragment key={p.faction}>
                        <Component
                            {...clareiras[numbers[index]]}
                            color={ROOT_FACTIONS_MAP_TOTAL[p.faction].color}
                        />
                        <Component
                            {...scaledClareiras[numbers[index]]}
                            color={ROOT_FACTIONS_MAP_TOTAL[p.faction].color}
                            isScaled={true}
                        />
                        <Points
                            quadrant={p.points}
                            faction={ROOT_FACTIONS_MAP_TOTAL[p.faction]}
                        />
                        <Points
                            quadrant={p.points}
                            faction={ROOT_FACTIONS_MAP_TOTAL[p.faction]}
                            isScaled={true}
                        />
                    </React.Fragment >
                )
            })}
            <Image src={MapaImage} alt='mapa' className={styles.mapaInicial} />
        </div>
    )
};

export default Mapa;