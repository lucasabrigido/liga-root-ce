import styles from './input-label.module.scss';

const InputLabel = ({text = '', placeholder, type = 'text', name, required, ...rest}) => {
    return (
        <div className={styles.input}>
            <label>
                {text}
                <input type={type} placeholder={placeholder} name={name} required={required} {...rest} />
            </label>
        </div>
    );
};

export default InputLabel;