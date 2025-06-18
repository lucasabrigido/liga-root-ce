import styles from './success.module.scss';

const Success = () => {
    return (
        <div className={styles.page}>
            <div>
                <h1>Conta Criada</h1>
                <p>
                    Conta criada com sucesso, logue e aproveite tudo 
                    que o site tem a oferecer!
                </p>
            </div>
        </div>
    )
};

export default Success;