import { useState, useEffect } from "react";
import * as bookService from '../../services/bookService';

import BookItem from "./bookItem/BookItem";
import styles from './Catalog.module.css';

const Catalog = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        bookService.getAll()
            .then(result => {                
                setBooks(result);                
            });
    }, []);

    return (
        <section className={styles["catalog-page"]}>           
           
            {books.length > 0
                ? books.map(x => <BookItem key={x._id} book={x} />)
                : <h3 className="message-when-no-data">No books yet</h3>
            }           
            
        </section>
    );
};

export default Catalog;