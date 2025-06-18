import Vagabond from '@assets/images/vagabond2.png';
import Image from 'next/image';

import styles from './maeples.module.scss';

const len = '2px';

const Vagabonds = ({ top, left, color, isScaled }) => {
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
                <Image src={Vagabond} alt='vagabond' />
            </div>
        </div>
    )
};

export default Vagabonds;