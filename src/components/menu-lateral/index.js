import { ItemsMenu } from '@utils/constants';
import Link from 'next/link';
import styles from './menu-lateral.module.scss';

const MenuLateral = () => {
    return (
        <div id='menu-lateral' className={styles.container}>
            {
                ItemsMenu.map(item => {
                    return (
                        <div className={styles.item} key={'lateral' + item.name}>
                            <Link
                                href={item.path}
                            >
                                {item.name}
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default MenuLateral;