import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { AuthContext } from '../../../contexts/AuthContext';
import * as bookService from '../../../services/bookService';
import { isUserAdmin } from '../../../utils/utils';
import { languages } from '../../../languages/languages';
import BookItemAdmin from './bookItem/BookItemAdmin';

import styles from './CatalogAdmin.module.css';

import { PAGE_SIZE } from '../../../constants';

const CatalogAdmin = () => {

    const { language } = useContext(LanguageContext);

    const { user } = useContext(AuthContext);

    const [books, setBooks] = useState([]);

    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const [booksIsEmpty, setBooksIsEmpty] = useState(false);

    const [showTitleArrowDown, setTitleShowArrowDown] = useState(true);
    const [showTitleArrowUp, setTitleShowArrowUp] = useState(false);
    const [showAuthorArrowDown, setAuthorShowArrowDown] = useState(true);
    const [showAuthorArrowUp, setAuthorShowArrowUp] = useState(false);

    useEffect(() => {        
        let offset = (page - 1) * PAGE_SIZE;        

        bookService.getAllAdmin(PAGE_SIZE, offset)
            .then(({ books, totalRecords }) => {
                setBooks(state => [...state, ...books]);
                setTotalRecords(totalRecords);
            })
            .catch(err => {
                console.log(err);
                setBooks([]);
            });
    }, [page]);

    const isAdmin = isUserAdmin(user);

    const bookDeleteHandler = (bookId) => {
        bookService.remove(bookId, isAdmin)
            .then(() => {
                setBooks(state => state.filter(x => x._id !== bookId));
                setTotalRecords(state => state - 1);
            })
            .catch(err => {
                alert(err.message);
                console.log(err);
            });
        
        const offsetAfterDelete = ((page - 1) * PAGE_SIZE) + PAGE_SIZE - 1;
        
        const pageSizeAfterDelete = 1;

        bookService.getAllAdmin(pageSizeAfterDelete, offsetAfterDelete)
            .then(({ books, totalRecords }) => {
                setBooks(state => [...state, ...books]);
                setTotalRecords(totalRecords);
            })
            .catch(err => {
                console.log(err);
                setBooks([]);
            });
    };

    const moreRecordsHandler = () => {
        setPage(state => state + 1);

        if (books.length + PAGE_SIZE >= totalRecords) {
            setBooksIsEmpty(true);
        }
    };

    const clickArrowDownHandler = (criteria) => {
        setBooks(state => {
            let newState = [...state];
            newState.sort((a, b) => a[criteria].localeCompare(b[criteria]));
            return newState;
        });

        if (criteria === 'title') {
            setTitleShowArrowDown(false);
            setTitleShowArrowUp(true);
        } else if (criteria === 'author') {
            setAuthorShowArrowDown(false);
            setAuthorShowArrowUp(true);
        }
    }

    const clickArrowUpHandler = (criteria) => {
        setBooks(state => {
            let newState = [...state];
            newState.sort((a, b) => b[criteria].localeCompare(a[criteria]));
            return newState;
        });

        if (criteria === 'title') {
            setTitleShowArrowDown(true);
            setTitleShowArrowUp(false);
        } else if (criteria === 'author') {
            setAuthorShowArrowDown(true);
            setAuthorShowArrowUp(false);
        }
    };

    return (
        <section className={styles["catalog-admin"]}>

            <div className={styles["table-wrapper"]}>
                <p className={styles["number-records"]}>{books.length} {languages.outOf[language]} {totalRecords} {languages.records[language]}</p>
                <table>
                    <thead>
                        <tr>
                            <th className={styles["table-title"]}>
                                {languages.title[language]}
                                {showTitleArrowDown &&
                                    <button className={styles["button-arrow"]} onClick={() => clickArrowDownHandler('title')}>
                                        <i className="fa-solid fa-arrow-down"></i>
                                    </button>
                                }
                                {showTitleArrowUp &&
                                    <button className={styles["button-arrow"]} onClick={() => clickArrowUpHandler('title')}>
                                        <i className="fa-solid fa-arrow-up"></i>
                                    </button>
                                }
                            </th>

                            <th>
                                {languages.author[language]}
                                {showAuthorArrowDown &&
                                    <button className={styles["button-arrow"]} onClick={() => clickArrowDownHandler('author')}>
                                        <i className="fa-solid fa-arrow-down"></i>
                                    </button>
                                }
                                {showAuthorArrowUp &&
                                    <button className={styles["button-arrow"]} onClick={() => clickArrowUpHandler('author')}>
                                        <i className="fa-solid fa-arrow-up"></i>
                                    </button>
                                }
                            </th>
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
