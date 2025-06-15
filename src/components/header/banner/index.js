'use client';

import Image from 'next/image';
import Banner from '@assets/images/banner.jpg';
import styles from './banner.module.scss';
import { ItemsMenu } from '@/utils/constants';
import { usePathname } from 'next/navigation';

const BannerComponent = () => {
    const currentPath = usePathname();

    const find = ItemsMenu.find(item => item.path === currentPath);

    if (!find?.renderBanner || !find) {
        return undefined;
    }

    return (
        <div className={styles.banner}>
            <Image src={Banner} alt='banner-root' />
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 1880 58'
                width='100%'
            >
                <path
                    d='M0 58.7V33.4L285.9 0l202.4 29.7L674 1.9l421.5 42.7 195-40.8L1478 37.1l200.6-14.9 133.7 33.4 67.9-7.4v10.4H0z'
                    fill='#231f20'
                >
                </path>
            </svg>
            <label>
                {find?.name || 'Liga ROOT CE'}
            </label>
        </div>
    );
};

export default BannerComponent;