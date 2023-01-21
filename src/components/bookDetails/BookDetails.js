import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as bookService from '../../services/bookService';
import styles from './BookDetails.module.css';


const BookDetails = () => {
    const {bookId} = useParams();
    const navigate = useNavigate();

    const [currentBook, setCurrentBook] = useState([]);

    useEffect(() => {
        bookService.getOne(bookId)
            .then(result => {                
                setCurrentBook(result);                
            });
    }, []);

    const bookDeleteHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this book?');
        if(confirmation) {
            bookService.remove(bookId)
                .then(() => {                    
                    navigate('/catalog');
                });
        }
    };

    return (
        <section className={styles["details-page"]}>
            <div className={styles["details-wrapper"]}>
                <img src={currentBook.imageUrl} />                
                <h1>{currentBook.title}</h1>
                <h2>{currentBook.author}</h2>
                <h3>{currentBook.genre}, {currentBook.year}</h3>                
                <h3>Price: {currentBook.price}$</h3>
                <p>Summary: {currentBook.summary}</p>
                <Link className={styles["btn-edit"]} to={`/catalog/${currentBook._id}/edit`}>Edit</Link>
                <button onClick={bookDeleteHandler} className={styles["btn-delete"]}>Delete</button>                
                <Link className={styles["btn-like"]} to={`/catalog/${currentBook._id}/like`}>Like</Link>                              
            </div>
        </section>
    );
};

export default BookDetails;