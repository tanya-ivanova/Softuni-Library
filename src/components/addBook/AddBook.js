import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as bookService from '../../services/bookService';
import styles from './AddBook.module.css';


const AddBook = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        title: '',
        author: '',
        genre: '',
        imageUrl: '',
        year: '',
        price: '',
        summary: ''
    });

    const changeValueHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < bound
        }));
    };

    const isPositive = (e) => {
        let number = Number(e.target.value);

        setErrors(state => ({
            ...state,
            [e.target.name]: number < 0
        }));        
    };

    const IMAGE_URL_PATTERN = /^https?:\/\/.+$/i;

    const isValidUrl = (e) => {                
        setErrors(state => ({
            ...state,
            [e.target.name]: !IMAGE_URL_PATTERN.test(e.target.value)
        }));        
    };

    const isFormValid = !Object.values(errors).some(x => x);

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

        bookService.create(bookData)
            .then(() => {
                e.target.reset();
                navigate(`/catalog`);
            });
    };

    return (
        <section className={styles["add-book-page"]}>
            <div className={styles["add-book-wrapper"]}>
                <form className={styles["add-book-form"]} onSubmit={onSubmit} >

                    <h1>Add Book</h1>
                    <label htmlFor="leg-title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />
                    {errors.title &&
                        <p className={styles.error}>
                            Title should be at least 3 characters long!
                        </p>
                    }

                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={values.author}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />

                    {errors.author &&
                        <p className={styles.error}>
                            Author should be at least 3 characters long!
                        </p>
                    }

                    <label htmlFor="genre">Genre</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={values.genre}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />

                    {errors.genre &&
                        <p className={styles.error}>
                            Genre should be at least 3 characters long!
                        </p>
                    }

                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={changeValueHandler}
                        onBlur={isValidUrl}
                    />

                    {errors.imageUrl &&
                        <p className={styles.error}>
                            Invalid image url!
                        </p>
                    }

                    <label htmlFor="year">Year</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={values.year}
                        onChange={changeValueHandler}
                        onBlur={isPositive}
                    />

                    {errors.year &&
                        <p className={styles.error}>
                            Year must be a positive number!
                        </p>
                    }

                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={values.price}
                        onChange={changeValueHandler}
                        onBlur={isPositive}
                    />

                    {errors.price &&
                        <p className={styles.error}>
                            Price must be a positive number!
                        </p>
                    }

                    <label htmlFor="summary">Summary</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={values.summary}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 10)}
                    />

                    {errors.summary &&
                        <p className={styles.error}>
                            Summary should be at least 10 characters long!
                        </p>
                    }

                    <div className={styles["btn-add-book"]}>
                        <button type="submit" disabled={!isFormValid} >Add Book</button>
                        <button id="action-cancel" className="btn" type="button" >Cancel</button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default AddBook;