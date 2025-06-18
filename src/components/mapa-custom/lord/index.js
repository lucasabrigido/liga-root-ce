import Lord from '@assets/images/lord.png';
import Image from 'next/image';

import styles from './maeples.module.scss';

const len = '2px';

const Lords = ({ top, left, color, isScaled }) => {
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
                <Image src={Lord} alt='lord' />
                <Image src={Lord} alt='lord' />
                <Image src={Lord} alt='lord' />
            </div>
        </div>
    )
};

export default Lords;