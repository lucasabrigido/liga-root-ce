import Image from 'next/image';
import VagabondImage from '@assets/images/vagabond.png';
import styles from './account-section.module.scss';

const AccountSection = () => {
    return (
        <section className={styles.SectionRedirect}>
            <div>
                <div>
                    <a
                        href='https://ludopedia.com.br/jogo/root'
                        target='_blank'
                    >
                        Ludopedia
                    </a>
                    <a
                        href='https://github.com/lucasabrigido'
                        target='_blank'
                    >
                        Github
                    </a>

                </div>
                <a
                    href='https://root-fandom-com.translate.goog/wiki/Vagabond?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc'
                    target='_blank'
                >
                    <Image src={VagabondImage} alt="faccao"/>
                </a>
            </div>
        </section>
    )
};


export default AccountSection;