import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookItemAdmin.module.css';

const BookItemAdmin = ({
    book
}) => {
    const navigate = useNavigate();

    const onClickEditIcon = () => {
        navigate(`/catalog/${book._id}/edit`);
    };

    return (
        <>            
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>{book._id}</td>
            <td>{book.ownerEmail}</td>
            <td>
                <button className={styles["table-button"]} onClick={onClickEditIcon}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className={styles["table-button"]}>
                    <i className="fa-regular fa-trash-can"></i>
                </button>
                <button className={styles["table-button"]}>
                    <i className="fa-solid fa-circle-info"></i>
                </button>
            </td>
        </>
    );
};

export default BookItemAdmin;