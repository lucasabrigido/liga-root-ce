'use client';

import SelectUser from '@components/select-user';
import Select from '@components/select';
import styles from './points.module.scss';
import { ROOT_FACTIONS } from '@utils/constants';

const Points = ({index, onChange, append, remove, total, error}) => {

    const changeParticipantId = (value) => {
        onChange(index, 'id', value[0]);
    }

    const changeParticipantPoints = (value) => {
        onChange(index, 'points', parseInt(value));
    }

    const changeFaction = (value) => {
        onChange(index, 'faction', value[0]);
    }


    return (
        <div className={styles.containerError}>
            <div className={styles.pointsContainer}>
                <SelectUser onChange={changeParticipantId} />
                <Select
                    onChange={changeFaction}
                    text='Facção'
                    options={ROOT_FACTIONS}
                />
                <input
                    className={styles.inputNumber}
                    type='number'
                    min='0'
                    max='30'
                    placeholder='P'
                    onChange={(e) => changeParticipantPoints(e.target.value)}
                />
                {
                    index === total-1 ? (
                        <button
                            className={styles.add}
                            onClick={() => append({ id: '', points: '' })}
                        >
                            +
                        </button>
                    ) : undefined
                }

                {
                    index !== 0 ? (
                        <button
                            className={styles.remove}
                            onClick={() => remove(index)}
                        >
                            X
                        </button>
                    ) : undefined
                }
            </div>
            {error && <span className={styles.spanError} >{error}</span>}
        </div>
    )
};

export default Points;