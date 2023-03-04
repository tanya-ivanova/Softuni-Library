import { useContext } from "react";
import { Link } from 'react-router-dom';

import { LanguageContext } from "../../../contexts/LanguageContext";
import { languages } from '../../../languages/languages';

import styles from './BookItem.module.css';


const BookItemGoogle = ({ book }) => {
    const { language } = useContext(LanguageContext);     
    
    return (
        <div className={styles["book-item-wrapper"]}>
            <img width = "130" height = "180" src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            <div className={styles["book-item"]}>
                <div className={styles["book-details"]}>
                    <h1>{book.volumeInfo.title}</h1>
                    <h2>{book.volumeInfo.authors?.join(', ')}</h2>
                    <h3>{book.volumeInfo.categories?.join(', ')} {book.volumeInfo.publishedDate} {book.volumeInfo.language.toUpperCase()}</h3>
                    <p>{book.volumeInfo.description?.substring(0, 300).concat('...')}</p>
                    <Link className={styles["btn-add"]} to={`/${book.id}/create`}>{languages.addBook[language]}</Link>
                </div>                
            </div>
        </div>
    );
};

export default BookItemGoogle;