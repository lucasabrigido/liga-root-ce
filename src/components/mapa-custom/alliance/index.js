import Meaple from '@assets/images/alliance.png';
import Image from 'next/image';

import styles from './maeples.module.scss';

const len = '2px';

const Alliance = ({ top, left, color, isScaled }) => {
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
                <Image src={Meaple} alt='Meaple' />
                <Image src={Meaple} alt='Meaple' />
                <Image src={Meaple} alt='Meaple' />
            </div>
        </div>
    )
};

export default Alliance;