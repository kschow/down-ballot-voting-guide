import React, { FC, useState } from 'react';
import styles from './Builders.module.scss';
import Delete from './icons/delete.svg';

type DeleteReturn = [FC, FC];

enum ModalState {
    OFF,
    ON,
}

const useDelete = (identifier: string, name: string, deleteFn: () => void): DeleteReturn => {
    const [modalState, setModalState] = useState(ModalState.OFF);

    const openModal = () => {
        setModalState(ModalState.ON);
    };

    const clearModal = () => {
        setModalState(ModalState.OFF);
    };

    const deleteElement = () => {
        deleteFn();
        clearModal();
    };

    const DeleteModal = () => {
        return (
            <>
                {
                    modalState === ModalState.ON &&
                    <div className={styles.DeleteModal}>
                        <div className={styles.ModalContents}>
                            <p>Are you sure you want to delete {identifier} ({name})?</p>
                            <div>
                                <button onClick={deleteElement}>Yes</button>
                                <button onClick={clearModal}>No</button>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    };

    const DeleteButton = () => {
        return (
            <button className={styles.Image} onClick={openModal}>
                <img
                    src={Delete}
                    alt={`Delete ${name}`}
                    title={`Delete ${name}`}
                />
            </button>
        );
    };

    return [DeleteModal, DeleteButton] as DeleteReturn;
};

export default useDelete;
