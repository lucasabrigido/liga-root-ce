import Link from 'next/link';
import { cookies } from 'next/headers';
import { ItemsMenu } from '@utils/constants';

import styles from './items-header.module.scss';

const ItemsHeader = async () => {
    const cookieStore = await cookies();
    const currentPath = cookieStore.get('current-path')?.value;
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