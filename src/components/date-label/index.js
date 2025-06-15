'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './date-label.module.scss';

const DateLabel = ({text = '', type = 'date', placeholder, name, required, ...rest}) => {
    const ref = useRef(); 
    const [value, setValue] = useState('');


    return (
        <div className={styles.input}>
            <input
                id={name}
                key={type}
                ref={ref}
                type={type}
                name={name}
                required={required}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                {...rest}
            />
            <label className={value ? styles.filled : ''} htmlFor={name}>{value ? value : placeholder}</label>
        </div>
    );
};

export default DateLabel;