'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './date-label.module.scss';

const DateLabel = ({text = '', placeholder, name, required, ...rest}) => {
    const ref = useRef(); 
    const [value, setValue] = useState('');
    const [type, setType] = useState('text');

    useEffect(() => {
        if (ref.current && type === 'date') {
            ref.current.focus();
        }
    }, [type]);

    return (
        <div className={styles.input}>
            <label>
                {text}
                <input
                    key={type}
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    onFocus={() => setType('date')}
                    onBlur={() => setType('text')}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    {...rest}
                />
            </label>
        </div>
    );
};

export default DateLabel;