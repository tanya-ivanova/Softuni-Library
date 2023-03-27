import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import * as bookService from '../../services/bookService';
import { languages } from '../../languages/languages';
import BookItemAdmin from './bookItem/BookItemAdmin';

import styles from './CatalogAdmin.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import { isUserAdmin } from '../../utils/utils';
import Backdrop from '../common/backdrop/Backdrop';
import Modal from '../common/modal/Modal';

const CatalogAdmin = () => {

    const { language } = useContext(LanguageContext);

    const { user } = useContext(AuthContext);

    const [books, setBooks] = useState([]);

    const [recordsToBeDisplayed, setRecordsToBeDisplayed] = useState(6);
    const [totalRecords, setTotalRecords] = useState(0);
  
    const [booksIsEmpty, setBooksIsEmpty] = useState(false);

    useEffect(() => {
        bookService.getAllAdmin(recordsToBeDisplayed)
            .then(({ books, totalRecords }) => {
                setBooks(books);
                setTotalRecords(totalRecords);

                if (books.length === totalRecords) {
                    setBooksIsEmpty(true);
                }
            })
            .catch(err => {
                console.log(err);
                setBooks([]);
            });
    }, [recordsToBeDisplayed]);

    const isAdmin = isUserAdmin(user);
   
    const bookDeleteHandler = (bookId) => {
        bookService.remove(bookId, isAdmin)
            .then(() => {                
                setBooks(state => state.filter(x => x._id !== bookId));
                setRecordsToBeDisplayed(state => state - 1);
            })
            .catch(err => {
                alert(err.message);
                console.log(err);
            });
    };

    const moreRecordsHandler = () => {
        setRecordsToBeDisplayed(state => state * 2);
    };

    return (
        <section className={styles["catalog-admin"]}>            

            <div className={styles["table-wrapper"]}>
                <p className={styles["number-records"]}>{books.length} {languages.outOf[language]} {totalRecords} {languages.records[language]}</p>
                <table>
                    <thead>
                        <tr>
                            <th className={styles["table-title"]}>{languages.title[language]}</th>
                            <th>{languages.author[language]}</th>
                            <th>{languages.year[language]}</th>
                            <th className={styles["table-id"]}>Id</th>
                            <th>{languages.ownerEmail[language]}</th>
                            <th>{languages.actions[language]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 && (
                            books.map(x =>
                                <tr key={x._id}>
                                    <BookItemAdmin
                                        book={x}                                        
                                        bookDeleteHandler={bookDeleteHandler}
                                    />
                                </tr>)
                        )}
                    </tbody>
                </table>
                {!booksIsEmpty && <button onClick={moreRecordsHandler} >{languages.moreRecords[language]}</button>}

            </div>
        </section>
    );
};

export default CatalogAdmin;