import Guardian from '@assets/images/guardian.png';
import Image from 'next/image';

import styles from './maeples.module.scss';

const len = '2px';

const Guardians = ({ top, left, color }) => {
    return (
        <div
            className={styles.meaple}
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
                <Image src={Guardian} alt='guardian' />
                <Image src={Guardian} alt='guardian' />
                <Image src={Guardian} alt='guardian' />
            </div>
        </div>
    )
};

export default Guardians;