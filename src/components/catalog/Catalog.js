import { useState, useEffect } from "react";
import * as bookService from '../../services/bookService';
import Spinner from "../common/Spinner/Spinner";

import BookItem from "./bookItem/BookItem";
import styles from './Catalog.module.css';

const Catalog = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        bookService.getAll()
            .then(result => {
                setBooks(result);
                setIsLoading(false);
            });
    }, []);

    
    if(isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }
    

    return (
        <section className={styles["catalog-page"]}>

            {books.length > 0
                ? books.map(x => <BookItem key={x._id} book={x} />)
                : <h2 className="message-when-no-data">No books yet</h2>
            }

        </section>
    );
};

export default Catalog;