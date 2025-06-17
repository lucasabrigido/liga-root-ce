'use client';
import styles from './form.module.scss';

import { toast } from 'sonner';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@components/server-side/button';
import MultiImageUploader from '@components/multi-image-uploader';

import { useForm, useFieldArray, } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SchemaGameSubmission } from '@api/game/models';
import DatePicker from '@components/date-picker';
import Points from './points';
import { useMutation } from '@tanstack/react-query';
import UserClient from '@modules/users/client';
import { getErrorMessage } from '@utils/functions';

export default function FormSubmission() {

    const {
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        control,
        trigger,
        reset,
    } = useForm({
        resolver: zodResolver(SchemaGameSubmission),
        mode: 'onBlur',
        defaultValues: {
            images: [],
            type: 'LOOSE',
            date: '',
            participants: [{ id: '', points: '', faction: '' }],
        },
    });

    const {
        fields: participantFields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'participants',
    });

    const { mutate, isPending } = useMutation({
        mutationFn: UserClient.createGame,
        onSuccess: () => {
            reset();
            toast.success('Jogo salvo com sucesso!');
        },
        onError: (err) => toast.error(getErrorMessage(err)),
    });

    const handleImages = (base64Array) => {
        setValue('images', base64Array, { shouldValidate: true });
    };

    const onChangeDate = (date, { validationError } = {}) => {
        if (!validationError && date?.toISOString) {
            setValue('date', date.toISOString(), { shouldValidate: true });
        } else {
            setValue('date', '', { shouldValidate: true });
        }
    };

    const onSubmit = async (data) => {
        const isValid = await trigger();
        if (isValid) {
            mutate(data);
        }
    };

    const changeParticipant = (index, key, value) => {
        setValue(`participants.${index}.${key}`, value, { shouldValidate: true, shouldDirty: true });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {
                isPending
                    ? <CircularProgress />
                    : (
                        <>
                            <DatePicker
                                placeholder='Data do jogo'
                                name='date'
                                required={true}
                                onChange={onChangeDate}
                                error={errors?.date?.message}
                            />

                            {participantFields.map((item, index) => (
                                <Points
                                    {...item}
                                    index={index}
                                    onChange={changeParticipant}
                                    key={index}
                                    append={append}
                                    remove={remove}
                                    total={participantFields.length}
                                    error={errors?.participants?.[index]?.points?.message || errors?.participants?.[index]?.id?.message}
                                />
                            ))}

                            <MultiImageUploader onFileChange={handleImages} />
                            <Button type='submit' text='Submeter Jogo' disabled={!isValid} />
                        </>
                    )
            }
        </form>
    );
}
