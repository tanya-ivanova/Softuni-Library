import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import * as bookService from '../../services/bookService';
import { languages } from '../../languages/languages';
import BookItemAdmin from './bookItem/BookItemAdmin';

import styles from './CatalogAdmin.module.css';

const CatalogAdmin = () => {
    const { language } = useContext(LanguageContext);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        bookService.getAllAdmin()
            .then((result) => {
                setBooks(result);
            })
            .catch(err => {
                console.log(err);
                setBooks([]);
            });
    }, []);

    return (
        <section className={styles["catalog-admin"]}>
            <div className={styles["table-wrapper"]}>
                <p>6 out of 100 records</p>
                <table>
                    <thead>
                        <tr>                            
                            <th>Title</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Id</th>
                            <th>Owner email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 && (
                            books.map(x =>
                                <tr key={x._id}>
                                    <BookItemAdmin book={x} />
                                </tr>)
                        )}
                    </tbody>
                </table>
                <span>More records</span>

            </div>
        </section>
    );
};

export default CatalogAdmin;