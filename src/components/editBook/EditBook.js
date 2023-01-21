import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import * as bookService from '../../services/bookService';
import styles from './EditBook.module.css';

const EditBook = () => {   
    const {bookId} = useParams();
    const navigate = useNavigate();

    const [currentBook, setCurrentBook] = useState([]);

    useEffect(() => {
        bookService.getOne(bookId)
            .then(result => {                
                setCurrentBook(result);                
            });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        //const bookData = Object.fromEntries(new FormData(e.target));

        const formData = new FormData(e.target);

        const bookData = {
            title: formData.get('title'),
            author: formData.get('author'),
            genre: formData.get('genre'),
            imageUrl: formData.get('imageUrl'),
            year: formData.get('year'),
            price: formData.get('price'),
            summary: formData.get('summary'),
        };

        if (bookData.title === '' || bookData.author === '' || bookData.genre === '' || bookData.imageUrl === ''
         || bookData.year === '' || bookData.price === '' || bookData.summary === '') {
            return alert('All fields are required!');
        }

        bookService.edit(bookId, bookData)
            .then(() => {
                e.target.reset();                               
                navigate(`/catalog/${bookId}/details`);
            });        
    };

    return (        
        <section className={styles["edit-book-page"]}>
            <div className={styles["edit-book-wrapper"]}>
                <form className={styles["edit-book-form"]} onSubmit={onSubmit} >

                    <h1>Edit Book</h1>
                    <label htmlFor="leg-title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={currentBook.title}
                    />

                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        defaultValue={currentBook.author}
                    />

                    <label htmlFor="genre">Genre</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        defaultValue={currentBook.genre}
                    />

                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        defaultValue={currentBook.imageUrl}
                    />

                    <label htmlFor="year">Year</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        defaultValue={currentBook.year}
                    />

                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        defaultValue={currentBook.price}
                    />

                    <label htmlFor="summary">Summary</label>
                    <textarea name="summary" id="summary" defaultValue={currentBook.summary} />

                    <div className={styles["btn-edit-book"]}>
                        <input type="submit" value="Edit Book" />
                    </div>

                </form>
            </div>
        </section>
    );
};

export default EditBook;