import styles from './styles.module.scss';
import FormSubmission from './form';

export default function GameSubmission() {

    return (
        <div className={styles.page}>
            <h1>
                Cadastrar Jogo
            </h1>
            <FormSubmission />
        </div>
    );
}
