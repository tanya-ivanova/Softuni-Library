import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { languages } from '../../../languages/languages';
import Backdrop from '../../common/backdrop/Backdrop';
import Modal from '../../common/modal/Modal';
import styles from './BookItemAdmin.module.css';

const BookItemAdmin = ({
    book,    
    showModal,
    showModalHandler,
    closeModalHandler,
    bookDeleteHandler,
}) => {
    const navigate = useNavigate();    

    const {language} = useContext(LanguageContext);
   
    const onClickEditIcon = () => {
        navigate(`/catalog/${book._id}/edit`);
    };

    const onClickInfoIcon = () => {
        navigate(`/catalog/${book._id}/details`);
    };

    return (
        <>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>{book._id}</td>
            <td>{book.ownerEmail}</td>
            <td>
                <button className={styles["table-button"]} onClick={onClickEditIcon} >
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>

                <button className={styles["table-button"]} onClick={showModalHandler} >
                    <i className="fa-regular fa-trash-can"></i>
                </button>
                {showModal && <Backdrop onClick={closeModalHandler} />}
                {showModal && <Modal 
                    text={languages.areYouSure[language]}                    
                    onClose={closeModalHandler} 
                    onConfirm={bookDeleteHandler} 
                    bookId={book._id}
                />}

                <button className={styles["table-button"]} onClick={onClickInfoIcon}>
                    <i className="fa-solid fa-circle-info"></i>
                </button>
            </td>
        </>
    );
};

export default BookItemAdmin;