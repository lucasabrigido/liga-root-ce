import styles from './notify.module.scss';

const Notify = () => {
    return (
        <div className={styles.container}>
            <div className={styles.notify}>
                <p>
                    A próxima edição da Liga terá início em três meses, com ciclos
                    semestrais intercalados
                    e participação dos mais bem pontuados do período.
                </p>
            </div>
        </div>
    )
};

export default Notify;