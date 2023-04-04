import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import * as bookService from '../../services/bookService';
import * as likeService from '../../services/likeService';
import * as commentService from '../../services/commentService';
import { isUserAdmin } from "../../utils/utils";
import Spinner from "../common/spinner/Spinner";
import Backdrop from "../common/backdrop/Backdrop";
import Modal from "../common/modal/Modal";
import ModalError from "../common/modal/ModalError";
import Like from "../like/Like";
import Comment from "../comment/Comment";

import styles from './BookDetails.module.css';

const BookDetails = () => {
    const { language } = useContext(LanguageContext);

    const { user } = useContext(AuthContext);
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [showModalError, setShowModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [currentBook, setCurrentBook] = useState({});
    const [totalLikes, setTotalLikes] = useState();
    const [isLiked, setIsLiked] = useState();
    const [comments, setComments] = useState([]);

    const [commentValue, setCommentValue] = useState('');

    useEffect(() => {
        Promise.all([
            bookService.getOne(bookId),
            likeService.getTotalLikesByBookId(bookId),
            user.accessToken ? likeService.getMyLikeByBookId(bookId, user._id) : 0,
            commentService.getByBookId(bookId)
        ])
            .then((values) => {
                setCurrentBook(values[0]);
                setTotalLikes(values[1]);
                setIsLiked(values[2]);
                setComments(values[3]);
                setIsLoading(false);
            })
            .catch(err => {
                alert(err.message);
                console.log(err);
            });
    }, [bookId, user._id, user.accessToken]);

    if (isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }

    const isOwner = user._id && user._id === currentBook._ownerId;
    const isAdmin = isUserAdmin(user);
    const showLikeButton = user._id !== undefined && isOwner === false && isAdmin === false && isLiked === 0;

    const showModalHandler = () => {
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
    }

    const bookDeleteHandler = () => {
        bookService.remove(bookId, isAdmin)
            .then(() => {
                if(isAdmin) {
                    navigate('/catalog-admin');
                } else {
                    navigate('/catalog');
                }
            })
            .catch(err => {
                alert(err.message);
                console.log(err);
            });
    };

    const bookLikeHandler = () => {
        likeService.likeBook(bookId)
            .then(() => {
                setTotalLikes(state => state + 1);
                setIsLiked(1);
            })
            .catch(err => {
                alert(err.message);
                console.log(err);
            });
    };

    const changeCommentValueHandler = (e) => {
        setCommentValue(e.target.value);
    };

    const addCommentHandler = (e) => {
        e.preventDefault();

        commentService.create(bookId, commentValue)
            .then(() => {
                setComments(state => {
                    return [
                        ...state,
                        {
                            bookId,
                            text: commentValue,
                            user
                        }
                    ];
                });
            })
            .catch(err => {
                setShowModalError(true);
                setErrorMessage(state => [...state, err.message]);
                console.log(err);
            });

        setCommentValue('');
    };

    const deleteCommentHandler = (commentId) => {
        if(!isAdmin) {
            throw new Error('You are not authorized!');
        }
        
        commentService.remove(commentId, isAdmin)
            .then(() => {
                setComments(state => state.filter(x => x._id !== commentId));
            })
            .catch(err => {                
                console.log(err);
            });
    };

    const onClickOk = () => {
        setShowModalError(false);
    }

    let authorForSearch;
    if (currentBook.author.split(' ').length > 1) {
        authorForSearch = currentBook.author.split(' ').join('-');
    } else {
        authorForSearch = currentBook.author;
    }

    return (
        <section className={styles["details-page"]}>

            {showModalError && <Backdrop onClick={onClickOk} />}
            {showModalError && <ModalError errorMessage={errorMessage} onClickOk={onClickOk} />}

            <div className={styles["details-wrapper"]}>
                <div className={styles["details-part"]}>
                    <div className={styles.container}>
                        <div>
                            <img width="200" height="250" className={styles.image} src={currentBook.imageUrl} alt={currentBook.title} />
                        </div>
                        <div className={styles["book-details"]}>
                            <h1>{currentBook.title}</h1>
                            <div>
                                <h2>{currentBook.author}</h2>
                                <p className={styles["author-paragraph"]}>{languages.searchForMoreBooks[language]} <Link className={styles["more-books-by-author"]} to={`/searchInGoogle?query=${authorForSearch}?searchBy=author`}>{languages.here[language]}</Link>.</p>
                            </div>
                            <h3>{currentBook.genre}, {currentBook.year}</h3>
                            <div><b>{languages.summary[language]}:</b> {parse(currentBook.summary)}</div>
                        </div>
                    </div>

                    <Like totalLikes={totalLikes} isLiked={isLiked} />

                    {isOwner || isAdmin
                        ? <div className={styles.buttons}>
                            <Link className={styles["btn-edit"]} to={`/catalog/${currentBook._id}/edit`}>{languages.edit[language]}</Link>
                            <button onClick={showModalHandler} className={styles["btn-delete"]}>{languages.delete[language]}</button>

                            {showModal && <Backdrop onClick={closeModalHandler} />}
                            {showModal && <Modal text={languages.areYouSure[language]} onClose={closeModalHandler} onConfirm={bookDeleteHandler} />}
                        </div>
                        : <></>
                    }

                    {showLikeButton
                        ? <div className={styles.buttons}>
                            <button onClick={bookLikeHandler} className={styles["btn-like"]}>{languages.like[language]}</button>
                        </div>
                        : <></>
                    }
                </div>

                <Comment
                    comments={comments}
                    isOwner={isOwner}
                    isAdmin={isAdmin}
                    commentValue={commentValue}
                    changeCommentValueHandler={changeCommentValueHandler}
                    addCommentHandler={addCommentHandler}
                    deleteCommentHandler={deleteCommentHandler}
                />
            </div>
        </section>
    );
};

export default BookDetails;
