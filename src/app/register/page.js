import InputLabel from '@components/server-side/input-label';
import styles from './styles.module.scss';
import Button from '@/components/server-side/button';

export default function Register() {
  return (
    <div className={styles.page}>
        <h1>
            Criar
            Conta
        </h1>
        <form action="/api/users" method="POST">
            <InputLabel
                placeholder='Primeiro Nome'
                type='text'
                name='firstName'
                required={true}
            />
            <InputLabel
                placeholder='Último Nome'
                type='text'
                name='lastName'
                required={true}
            />
            <InputLabel
                placeholder='Nickname'
                type='text'
                name='nickname'
                required={true}
            />
            <InputLabel
                placeholder='Data de Nascimento'
                type='date'
                name='birthdate'
                required={true}
            />
            <InputLabel
                placeholder='E-mail'
                type='email'
                name='email'
                required={true}
            />
            <InputLabel
                placeholder='Senha'
                type='password'
                name='password'
                required={true}
            />
            <InputLabel
                placeholder='Confirmar Senha'
                type='password'
                name='password2'
                required={true}
            />
            <Button type='submit' text='Registrar'/>
        </form>
    </div>
  );
}
