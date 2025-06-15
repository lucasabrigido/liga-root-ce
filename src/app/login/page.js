import InputLabel from '@components/server-side/input-label';
import styles from './styles.module.scss';
import Button from '@/components/server-side/button';

export default function Register() {
  return (
    <div className={styles.page}>
        <h1>
            Login
        </h1>
        <form action="/api/auth" method="POST">
            <InputLabel
                placeholder='E-mail'
                type='text'
                name='email'
                required={true}
            />
            <InputLabel
                placeholder='Senha'
                type='password'
                name='password'
                required={true}
            />
            <Button type='submit' text='Logar'/>
        </form>
    </div>
  );
}
