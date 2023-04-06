import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useValidateForm } from '../../../hooks/useValidateForm';
import { languages } from '../../../languages/languages';
import * as bookService from '../../../services/bookService';
import Backdrop from '../../common/backdrop/Backdrop';
import ModalError from '../../common/modal/ModalError';
import Notification from "../../common/notification/Notification";

import styles from './AddBook.module.css';

const AddBook = () => {
    const navigate = useNavigate();

    const {user} = useContext(AuthContext);

    const { language } = useContext(LanguageContext);

    const [showNotification, setShowNotification] = useState(true);

    const [showModalError, setShowModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const { googleBookId } = useParams();    

    const [values, setValues] = useState({
        title: '',
        author: '',
        genre: '',
        imageUrl: '',
        year: '',        
        summary: ''
    });

    useEffect(() => {
        if (googleBookId) {
            bookService.searchInGoogleGetOne(googleBookId)
                .then(result => {                                    
                        setValues({
                        title: result.volumeInfo.title || '',
                        author: result.volumeInfo.authors?.join(', ') || '',
                        genre: result.volumeInfo.categories?.join(', ') || '',
                        imageUrl: result.volumeInfo.imageLinks?.thumbnail || '',
                        year: result.volumeInfo.publishedDate || '',                        
                        summary: result.volumeInfo.description || ''
                    });
                })
                .catch(error => {
                    alert(error.message);
                    console.log(error);                    
                });
        }
    }, [googleBookId]);

    useEffect(() => {
        if (values.title === '' || values.author === '' || values.genre === '' 
        || values.imageUrl === '' || values.year === '' || values.summary === '') {
            setShowNotification(true);
        } else {
            setShowNotification(false);
        }
    }, [values.title, values.author, values.genre, values.imageUrl, values.year, values.summary])

    const {minLength, isPositive, isValidUrl, isFormValid, errors} = useValidateForm(values);

    const changeValueHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };    

    const onClickOk = () => {
        setShowModalError(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const bookData = {
            title: values.title,
            author: values.author,
            genre: values.genre,
            imageUrl: values.imageUrl,
            year: values.year,            
            summary: values.summary,
            ownerEmail: user.email
        };

        bookService.create(bookData)
            .then(() => {
                setValues({
                    title: '',
                    author: '',
                    genre: '',
                    imageUrl: '',
                    year: '',            
                    summary: ''
                });

                navigate(`/catalog`);
            })
            .catch(error => {
                setShowModalError(true);
                setErrorMessage(state => [...state, error.message]); 
                console.log(error);               
            });
    };

    const onCancel = () => {
        setValues({
            title: '',
            author: '',
            genre: '',
            imageUrl: '',
            year: '',            
            summary: ''
        });
    }

    return (
        <section className={styles["add-book-page"]}>
            {showNotification && <Notification message={languages.allFieldsRequired[language]} />}

            {showModalError && <Backdrop onClick={onClickOk} />}
            {showModalError && <ModalError errorMessage={errorMessage} onClickOk={onClickOk} />}

            <div className={styles["add-book-wrapper"]}>
                <form className={styles["add-book-form"]} onSubmit={onSubmit} >

                    <h1>{languages.addBook[language]}</h1>
                    <label htmlFor="title">{languages.title[language]}</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />
                    {errors.title &&
                        <p className="error">
                            {languages.titleErrorMessage[language]}
                        </p>
                    }

                    <label htmlFor="author">{languages.author[language]}</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={values.author}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />

                    {errors.author &&
                        <p className="error">
                            {languages.authorErrorMessage[language]}
                        </p>
                    }

                    <label htmlFor="genre">{languages.genre[language]}</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={values.genre}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />

                    {errors.genre &&
                        <p className="error">
                            {languages.genreErrorMessage[language]}
                        </p>
                    }

                    <label htmlFor="imageUrl">{languages.imageUrl[language]}</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={changeValueHandler}
                        onBlur={isValidUrl}
                    />

                    {errors.imageUrl &&
                        <p className="error">
                            {languages.imageUrlErrorMessage[language]}
                        </p>
                    }

                    <label htmlFor="year">{languages.year[language]}</label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        value={values.year}
                        onChange={changeValueHandler}
                        onBlur={isPositive}
                    />

                    {errors.year &&
                        <p className="error">
                            {languages.yearErrorMessage[language]}
                        </p>
                    }                    

                    <label htmlFor="summary">{languages.summary[language]}</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={values.summary}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 10)}
                        rows="5"
                    />

                    {errors.summary &&
                        <p className="error">
                            {languages.summaryErrorMessage[language]}
                        </p>
                    }

                    <div className={styles["btn-add-book"]}>
                        <button
                            type="submit"
                            disabled={!isFormValid || showNotification}
                            className={`${!isFormValid || showNotification ? 'button-disabled' : ''}`}
                        >
                            {languages.addBook[language]}
                        </button>

                        <button
                            type="button"
                            onClick={onCancel}
                        >
                            {languages.cancel[language]}
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default AddBook;
