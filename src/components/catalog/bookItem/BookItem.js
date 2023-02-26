import { useContext } from "react";
import { Link } from 'react-router-dom';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { languages } from '../../../languages/languages';
import styles from './BookItem.module.css';


const BookItem = ({ book, profile }) => {
    const { language } = useContext(LanguageContext);

    const classBookItem = profile ? styles["book-item"] : '';
    const classBookDetails = profile ? styles["book-details"] : '';
    const classButtonDetails = profile ? styles.button : '';
    const bookItemWrapper = !profile ? styles["book-item-wrapper"] : styles["book-item-wrapper-my-books"];

    return (
        <div className={bookItemWrapper}>
            {!profile && <img src={book.imageUrl} />}
            <div className={classBookItem}>
                <div className={classBookDetails}>
                    <h1>{book.title}</h1>
                    <h2>{book.author}</h2>
                    <h3>{book.genre}</h3>
                </div>
                <div className={classButtonDetails}>
                    <Link className={styles["btn-details"]} to={`/catalog/${book._id}/details`}>{languages.details[language]}</Link>
                </div>
            </div>
        </div>
    );
};

export default BookItem;