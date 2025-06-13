import { use } from 'react';
import UserClient from '../../modules/users/client';
import styles from './styles.module.scss';

export default function Register() {
    const userInfo = use(UserClient.userInfo());
    console.log('etste: ', userInfo);
  return (
    <div className={styles.page}>
        {/* <form action="/api/registro" method="POST">
            <label>
                Nome:
                <input type="text" name="nome" required />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" required />
            </label>
            <br />
            <label>
                Senha:
                <input type="password" name="senha" required />
            </label>
            <br />
            <button type="submit">Registrar</button>
        </form> */}
    </div>
  );
}
