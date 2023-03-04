import { useContext } from "react";
import { Link } from 'react-router-dom';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { languages } from '../../../languages/languages';
import styles from './BookItem.module.css';


const BookItemProfile = ({ book }) => {
    const { language } = useContext(LanguageContext);

    return (
        <div className={styles["book-item-wrapper-my-books"]}>            
            <div className={styles["book-item"]}>
                <div className={styles["book-details-profile"]}>
                    <h1>{book.title}</h1>
                    <h2>{book.author}</h2>
                    <h3>{book.genre}</h3>
                </div>
                <div className={styles.button}>
                    <Link className={styles["btn-details"]} to={`/catalog/${book._id}/details`}>{languages.details[language]}</Link>
                </div>
            </div>
        </div>
    );
};

export default BookItemProfile;
