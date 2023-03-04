import { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import * as bookService from '../../services/bookService';
import BookItem from "../catalog/bookItem/BookItem";
import Spinner from "../common/spinner/Spinner";
import Pager from "../common/pager/Pager";
import Card from "../common/card/Card";
import styles from './Profile.module.css';

const Profile = () => {
    const { language } = useContext(LanguageContext);

    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);

    const [books, setBooks] = useState([]);
    const [pages, setPages] = useState(1);

    const location = useLocation();

    const page = Number(new URLSearchParams(location.search).get("page")) || 1;

    useEffect(() => {
        bookService.getByUserId(user._id, page)
            .then(({ books, pages }) => {                
                setBooks(books);
                setPages(pages);
                setIsLoading(false);
            })
            .catch(err => {                
                setBooks([]);
                setIsLoading(false);
            });
    }, [user._id, page]);

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
            <section className={styles["profile-page"]}>

                <Card className={styles.books}>
                {books.length > 0
                    ? books.map(x => (
                        <Card className={styles.bookItem} key={x._id}>
                            <BookItem book={x} profile={true} />
                        </Card>
                    ))
                    : <h2 className="message-when-no-data">{languages.noBooksYet[language]}</h2>
                }
                </Card>

            </section>
            <section className="pager">
                <Pager page={page} pages={pages} />
            </section>
        </>
    );
};

export default Profile;