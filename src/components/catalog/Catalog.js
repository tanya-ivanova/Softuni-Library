import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import * as bookService from '../../services/bookService';
import Spinner from "../common/spinner/Spinner";

import BookItem from "./bookItem/BookItem";
import styles from './Catalog.module.css';

const Catalog = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState(3);

    const location = useLocation();

    const page = Number(new URLSearchParams(location.search).get("page")) || 1;
    

    useEffect(() => {
        bookService.getAll()
            .then(result => {
                setBooks(result);
                setIsLoading(false);
            });
    }, []);


    if (isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }
    const linkToPrev = page !== 1 ? `/catalog?page=${page - 1}` : null;
    const linkToNext = page < pages ? `/catalog?page=${page + 1}` : null;
    console.log(page);

    return (
        <section className={styles["catalog-page"]}>
            <div>
                Page {page} of {pages}
                {linkToPrev && <Link to={linkToPrev} >&lt;Prev</Link>}
                {linkToNext && <Link to={linkToNext}>Next&gt;</Link>}
            </div>

            {books.length > 0
                ? books.map(x => <BookItem key={x._id} book={x} />)
                : <h2 className="message-when-no-data">No books yet</h2>
            }

        </section>
    );
};

export default Catalog;