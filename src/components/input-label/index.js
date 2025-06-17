import styles from './input-label.module.scss';

const InputLabel = ({text = '', placeholder, type = 'text', name, required, error, ...rest}) => {
    return (
        <div className={styles.input}>
            <label>
                {text}
                <input type={type} placeholder={placeholder} name={name} required={required} {...rest} />
                {error && <span>{error}</span>}
            </label>
        </div>
    );
};

export default InputLabel;