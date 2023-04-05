import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../contexts/AuthContext";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useValidateForm } from "../../../hooks/useValidateForm";
import { languages } from '../../../languages/languages';
import * as bookService from '../../../services/bookService';
import { isUserAdmin } from "../../../utils/utils";
import Backdrop from "../../common/backdrop/Backdrop";
import ModalError from "../../common/modal/ModalError";
import Notification from "../../common/notification/Notification";
import Spinner from "../../common/spinner/Spinner";

import styles from './EditBook.module.css';

const EditBook = () => {
    const { language } = useContext(LanguageContext);

    const { bookId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [isOwner, setIsOwner] = useState(true);
  
    const [showModalError, setShowModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [showNotification, setShowNotification] = useState(true);

    const [ownerEmail, setOwnerEmail] = useState('');

    const [values, setValues] = useState({
        title: '',
        author: '',
        genre: '',
        imageUrl: '',
        year: '',
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
                    summary: result.summary
                });
                setIsOwner(user._id && user._id === result._ownerId);
                setOwnerEmail(result.ownerEmail);
                setIsLoading(false);
            })
            .catch(err => {
                alert(err.message);
                console.log(err);
            });
    }, [bookId, user._id]);

    useEffect(() => {
        if (values.title === '' || values.author === '' || values.genre === '' 
        || values.imageUrl === '' || values.year === '' || values.summary === '') {
            setShowNotification(true);
        } else {
            setShowNotification(false);
        }
    }, [values.title, values.author, values.genre, values.imageUrl, values.year, values.summary])

    const {minLength, isPositive, isValidUrl, isFormValid, errors} = useValidateForm(values);

    if (isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }

    const isAdmin = isUserAdmin(user);

    if (!isAdmin && !isOwner) {
        throw new Error('You are not authorized');
    }

    const changeValueHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
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
            ownerEmail
        };        

        bookService.edit(bookId, bookData, isAdmin)
            .then(() => { 
                setValues({
                    title: '',
                    author: '',
                    genre: '',
                    imageUrl: '',
                    year: '',            
                    summary: ''
                });

                navigate(`/catalog/${bookId}/details`);
            })
            .catch(err => {
                setShowModalError(true);
                setErrorMessage(state => [...state, err.message]);
                console.log(err);
            });
    };

    const onCancel = () => {
        if (isAdmin) {
            navigate('/catalog-admin');
        } else {
            navigate(`/catalog/${bookId}/details`);
        }
    }

    return (
        <section className={styles["edit-book-page"]}>
            {showNotification && <Notification message={languages.allFieldsRequired[language]} />}

            {showModalError && <Backdrop onClick={onClickOk} />}
            {showModalError && <ModalError errorMessage={errorMessage} onClickOk={onClickOk} />}

            <div className={styles["edit-book-wrapper"]}>
                <form className={styles["edit-book-form"]} onSubmit={onSubmit} >

                    <h1>{languages.editBook[language]}</h1>
                    <label htmlFor="leg-title">{languages.title[language]}</label>
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
                    />

                    {errors.summary &&
                        <p className="error">
                            {languages.summaryErrorMessage[language]}
                        </p>
                    }

                    <div className={styles["btn-edit-book"]}>
                        <button 
                            type="submit" 
                            disabled={!isFormValid || showNotification} 
                            className={`${!isFormValid || showNotification ? 'button-disabled' : ''}`}
                        >
                            {languages.editBook[language]}
                        </button>
                        <button type="button" onClick={onCancel} >{languages.cancel[language]}</button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default EditBook;
