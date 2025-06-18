import Marquise from '@assets/images/root-marquis.png';
import Image from 'next/image';

import styles from './marquises.module.scss';

const len = '2px';

const Marquises = ({ top, left, color, isScaled }) => {
    return (
        <div
            className={`${styles.meaple} ${isScaled ? styles.scaled : styles.notScaled}`}
            style={{
                top,
                left,
                filter: `drop-shadow(${len} 0 0 ${color})
                    drop-shadow(-${len} 0 0 ${color})
                    drop-shadow(0 ${len} 0 ${color})
                    drop-shadow(0 -${len} 0 ${color})`
            }}
        >
            <div className={styles.containerInternal}>
                <Image src={Marquise} alt='marquis' />
                <Image src={Marquise} alt='marquis' />
                <Image src={Marquise} alt='marquis' />
            </div>
        </div>
    )
};

export default Marquises;