import { useContext } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { languages } from '../../../languages/languages';
import styles from './Modal.module.css';

const Modal = ({
    text,
    onClose,
    onConfirm,
    bookId
}) => {
    const { language } = useContext(LanguageContext);

    return (
        <div className={styles.modal}>
            <p>{text}</p>
            <button onClick={() => onConfirm(bookId)}>
                {languages.confirm[language]}
            </button>
            <button onClick={onClose}>
                {languages.cancel[language]}
            </button>
        </div>
    );
}

export default Modal;
