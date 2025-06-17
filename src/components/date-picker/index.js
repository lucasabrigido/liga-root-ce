'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import styles from './date-picker.module.scss';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export default function BasicDatePicker({ name, placeholder, error, ...rest }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <div className={styles.absolute}>
        <DatePicker
          className={styles.datePicker}
          format="DD/MM/YYYY"
          {...rest}
          slotProps={{
            textField: {
              variant: 'outlined',
              InputLabelProps: { shrink: false },
              inputProps: {
                placeholder,
                readOnly: false,
                name,
              },
            },
          }}
        />
        {error && <span className={styles.errorSpan}>{error}</span>}
      </div>
    </LocalizationProvider>
  );
}
