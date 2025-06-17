'use client';
import MenuIcon from '@mui/icons-material/Menu';

import styles from './menu-item.module.scss';

const MenuItem = () => {
    function toggleMenu() {
        const menu = document.getElementById('menu-lateral');
        menu.classList.toggle('active');
    }
    return (
        <div className={styles.containerIcon} onClick={toggleMenu}>
            <MenuIcon className={styles.iconMenu} color='#fff'/>
        </div>
    )
};

export default MenuItem;