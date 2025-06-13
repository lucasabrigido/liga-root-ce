import Image from 'next/image'
import LogoImage from '@assets/images/logo.png';
import styles from './header.module.scss';
import ItemsHeader from './items-header';
import AccountSection from './account-section';
import Banner from './banner';
import Notify from './notify';

const Header = () => {
    return (
        <header className={styles.Header} >
            <Notify/>
            <div className={styles.container}>
                <Image src={LogoImage} alt='logo'/>
                <ItemsHeader/>
                <AccountSection/>
            </div>
            <Banner/>
        </header>
    )
};


export default Header;