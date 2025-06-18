import Image from 'next/image';
import styles from './points.module.scss';

const len = '1px';
function calculatePosition(n) {
  return 12.4444 * n + 3.5556;
}

const Points = ({quadrant, faction}) => {
    const {color, token} = faction;
    return (
        <div
            className={styles.points}
            style={{
                left: `${calculatePosition(quadrant)}px`,
                filter: `drop-shadow(${len} 0 0 ${color})
                    drop-shadow(-${len} 0 0 ${color})
                    drop-shadow(0 ${len} 0 ${color})
                    drop-shadow(0 -${len} 0 ${color})`,
            }}
        >
            <Image alt='faction' src={token} />
        </div>
    )
};

export default Points;