import styles from './button.module.scss';

const Button = ({text = '', type = 'submit', ...rest}) => {
    return (
        <div className={styles.button}>
            <button type={type} {...rest}>{text}</button>
        </div>
    );
};

export default Button;