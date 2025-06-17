'use client';

import { useQuery } from '@tanstack/react-query';
import UserClient from '@modules/users/client';
import styles from './select-user.module.scss';
import Select from '@components/select';
import { useMemo } from 'react';

const SelectUser = ({onChange}) => {
    const {data} = useQuery({
        queryKey: ['users'],
        queryFn: async () => await UserClient.allUsers(),
    });

    const options = useMemo(() => {
        return data?.users?.map(e => ({id: e.id, value: e.nickname})) || [];
    }, [data]);

    return (
        <div className={styles.containerSelect}>
            <Select text='Nickname' options={options || []} onChange={onChange} />
        </div>
    )
};

export default SelectUser;