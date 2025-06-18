import Lizzard from '@assets/images/lizard.png';
import Image from 'next/image';

import styles from './maeples.module.scss';

const len = '2px';

const Lizzards = ({ top, left, color }) => {
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
                <Image src={Lizzard} alt='lizzard' />
                <Image src={Lizzard} alt='lizzard' />
                <Image src={Lizzard} alt='lizzard' />
            </div>
        </div>
    )
};

export default Lizzards;