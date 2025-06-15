'use client';

import { usePathname } from "next/navigation";
import Link from 'next/link';
import { ItemsMenu } from '@utils/constants';

import styles from './items-header.module.scss';

const ItemsHeader = () => {
    const currentPath = usePathname();
    console.log('currentPath', currentPath);
    return (
        <div className={styles.ItemMenu} >
            {
                ItemsMenu.map(item => {
                    return <Item key={item.name} currentPath={currentPath} {...item}/>
                })
            }
        </div>
    )
};

const Item = ({path, name, currentPath}) => {
    return (
        <div>
            <Link
                href={path}
                className={
                    currentPath === path ? styles.current : styles.text
                }>
                {name}
            </Link>
        </div>
    )
};

export default ItemsHeader;