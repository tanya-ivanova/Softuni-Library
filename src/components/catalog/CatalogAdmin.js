import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import * as bookService from '../../services/bookService';
import { languages } from '../../languages/languages';
import BookItemAdmin from './bookItem/BookItemAdmin';

import styles from './CatalogAdmin.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import { isUserAdmin } from '../../utils/utils';

const CatalogAdmin = () => {     

    const { language } = useContext(LanguageContext);

    const {user} = useContext(AuthContext);

    const [books, setBooks] = useState([]);

    const [recordsToBeDisplayed, setRecordsToBeDisplayed] = useState(6);
    const [totalRecords, setTotalRecords] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const [booksIsEmpty, setBooksIsEmpty] = useState(false);    

    useEffect(() => {
        bookService.getAllAdmin(recordsToBeDisplayed)
            .then(({books, totalRecords}) => {
                setBooks(books);
                setTotalRecords(totalRecords);

                if(books.length === totalRecords) {
                    setBooksIsEmpty(true);
                }
            })
            .catch(err => {
                console.log(err);
                setBooks([]);
            });
    }, [recordsToBeDisplayed]);

    const isAdmin = isUserAdmin(user);

    const showModalHandler = () => {
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
    } 

    const bookDeleteHandler = (bookId) => {
        bookService.remove(bookId, isAdmin)
            .then(() => {
                setShowModal(false);
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
                <p className={styles["number-records"]}>{books.length} out of {totalRecords} records</p>
                <table>
                    <thead>
                        <tr>                            
                            <th className={styles["table-title"]}>Title</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th className={styles["table-id"]}>Id</th>
                            <th>Owner email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 && (
                            books.map(x =>
                                <tr key={x._id}>
                                    <BookItemAdmin 
                                    book={x}                                     
                                    showModal={showModal}
                                    showModalHandler={showModalHandler} 
                                    closeModalHandler={closeModalHandler}
                                    bookDeleteHandler={bookDeleteHandler}
                                />
                                </tr>)
                        )}
                    </tbody>
                </table>
                {!booksIsEmpty && <button onClick={moreRecordsHandler} >More records</button>}
                                
            </div>
        </section>
    );
};

export default CatalogAdmin;