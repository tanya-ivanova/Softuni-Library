import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import * as bookService from '../../services/bookService';
import styles from './EditBook.module.css';

const EditBook = () => {
    const { bookId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isOwner, setIsOwner] = useState(true);
    
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

    useEffect(() => {
        bookService.getOne(bookId)
            .then(result => {                
                setValues({
                    title: result.title,
                    author: result.author,
                    genre: result.genre,
                    imageUrl: result.imageUrl,
                    year: result.year,
                    price: result.price,
                    summary: result.summary
                });
                setIsOwner(user._id && user._id === result._ownerId);                
            });
    }, []); 
    
    if(!isOwner) {
        throw new Error('You are not authorized');
    }

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
            [e.target.name]: number < 0 || isNaN(number)
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

        const bookData = {
            title: values.title,
            author: values.author,
            genre: values.genre,
            imageUrl: values.imageUrl,
            year: values.year,
            price: values.price,
            summary: values.summary,
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

    const onCancel = (e) => {
        setValues({
            title: '',
            author: '',
            genre: '',
            imageUrl: '',
            year: '',
            price: '',
            summary: ''
        });
    }

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
                        type="text"
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
                        type="text"
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

                    <div className={styles["btn-edit-book"]}>                        
                        <button type="submit" disabled={!isFormValid} className={styles[`${!isFormValid ? 'button-disabled' : ''}`]} >Edit Book</button>
                        <button type="button" onClick={onCancel} >Cancel</button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default EditBook;