import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import * as bookService from '../../services/bookService';
import * as likeService from '../../services/likeService';
import * as commentService from '../../services/commentService';
import Spinner from "../common/spinner/Spinner";
import Backdrop from "../common/backdrop/Backdrop";
import Modal from "../common/modal/Modal";
import Like from "../like/Like";
import Comment from "../comment/Comment";

import styles from './BookDetails.module.css';


const BookDetails = () => {
    const { language } = useContext(LanguageContext);

    const { user } = useContext(AuthContext);
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [showModal, setShowModal] = useState();

    const [currentBook, setCurrentBook] = useState({});
    const [totalLikes, setTotalLikes] = useState();
    const [isLiked, setIsLiked] = useState();
    const [comments, setComments] = useState([]);

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
    const showLikeButton = user._id !== undefined && isOwner === false && isLiked === 0;
   

    const showModalHandler = () => {
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
    }

    const bookDeleteHandler = () => {
        bookService.remove(bookId)
            .then(() => {
                navigate('/catalog');
            });
    };

    const bookLikeHandler = () => {
        likeService.likeBook(bookId)
            .then(() => {
                window.location.reload(true);
            });
    };

    const addCommentHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const comment = formData.get('comment');

        commentService.create(bookId, comment)
            .then(() => {
                window.location.reload(true);
            });
    };


    return (
        <section className={styles["details-page"]}>
            <div className={styles["details-wrapper"]}>
                <div className={styles["details-part"]}>
                    <div className={styles.container}>
                        <div>
                            <img width="200" height="250" className={styles.image} src={currentBook.imageUrl} alt={currentBook.title} />
                        </div>
                        <div className={styles["book-details"]}>
                            <h1>{currentBook.title}</h1>
                            <h2>{currentBook.author}</h2>
                            <h3>{currentBook.genre}, {currentBook.year}</h3>
                            <h3>{languages.price[language]}: {currentBook.price}$</h3>
                            <p>{languages.summary[language]}: {currentBook.summary}</p>
                        </div>
                    </div>
                    
                    <Like totalLikes={totalLikes} isLiked={isLiked} />

                    {isOwner
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
                    addCommentHandler={addCommentHandler} 
                />
            </div>
        </section>
    );
};

export default BookDetails;
