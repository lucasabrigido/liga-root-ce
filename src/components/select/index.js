'use client';

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import styles from './select.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: '-webkit-fill-available',
            margin: 0,
        },
    },
};


export default function MultipleSelectPlaceholder({ multiple = false, text, onChange, options = [] }) {
    const [values, setValues] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        let values = typeof value === 'string' ? value.split(',') : value;
        setValues(values);
        values = values.map(e => {
            const find = options.find(o => o.id === e);
            return find?.id || e
        });
        onChange(values)
    };

    return (
        <FormControl className={styles.form} sx={{ m: 1, width: 300, mt: 3 }}>
            <Select
                multiple={multiple}
                displayEmpty
                value={values}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <em>{text}</em>;
                    }

                    return selected.map(e => {
                        const find = options.find(o => o.id === e);
                        return find?.value || e
                    }).join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem disabled value=''>
                    <em>{text}</em>
                </MenuItem>
                {options.map(({ id, value }) => (
                    <MenuItem
                        key={id}
                        value={id}
                    >
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}