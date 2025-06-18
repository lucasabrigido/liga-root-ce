import Rive from '@assets/images/rive.png';
import Image from 'next/image';

import styles from './maeples.module.scss';

const len = '2px';

const Rives = ({ top, left, color, isScaled }) => {
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
                <Image src={Rive} alt='rive' />
                <Image src={Rive} alt='rive' />
                <Image src={Rive} alt='rive' />
            </div>
        </div>
    )
};

export default Rives;