import { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { LanguageContext } from "../../contexts/LanguageContext";
import {languages} from '../../languages/languages';
import * as bookService from '../../services/bookService';
import Pager from "../common/pager/Pager";
import Spinner from "../common/spinner/Spinner";

import BookItem from "./bookItem/BookItem";
import styles from './Catalog.module.css';

const Catalog = () => {
    const {language} = useContext(LanguageContext);

    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState();

    const location = useLocation();

    const page = Number(new URLSearchParams(location.search).get("page")) || 1;


    useEffect(() => {
        bookService.getAll(page)
            .then(({ books, pages }) => {
                setBooks(books);
                setPages(pages);
                setIsLoading(false);
            });
    }, [page]);


    if (isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }


    return (
        <>
            <section className="pager">
                <Pager page={page} pages={pages} />
            </section>
            <section className={styles["catalog-page"]}>
                {books.length > 0
                    ? books.map(x => <BookItem key={x._id} book={x} />)
                    : <h2 className="message-when-no-data">{languages.noBooksYet[language]}</h2>
                }
            </section>
            <section className="pager">
                <Pager page={page} pages={pages} />
            </section>
        </>
    );
};

export default Catalog;