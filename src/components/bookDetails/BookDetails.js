import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import * as bookService from '../../services/bookService';
import * as likeService from '../../services/likeService';
import * as commentService from '../../services/commentService';
import styles from './BookDetails.module.css';


const BookDetails = () => {   

    const { user } = useContext(AuthContext);
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [currentBook, setCurrentBook] = useState([]);
    const [totalLikes, setTotalLikes] = useState();
    const [isLiked, setIsLiked] = useState();
    const [comments, setComments] = useState([]);

    const likesStyle = `${styles.likes} fa fa-thumbs-up`;


    useEffect(() => {
        Promise.all([
            bookService.getOne(bookId),
            likeService.getTotalLikesByBookId(bookId),
            user.accessToken ? likeService.getMyLikeByBookId(bookId, user._id) : 0,
            commentService.getByBookId(bookId)
        ]).then((values) => {
            setCurrentBook(values[0]);
            setTotalLikes(values[1]);
            setIsLiked(values[2]);
            setComments(values[3]);            
        });
    }, []);

    const isOwner = user._id && user._id === currentBook._ownerId;  
    const showLikeButton = user._id != undefined && isOwner == false && isLiked == false;

    const bookDeleteHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this book?');
        if (confirmation) {
            bookService.remove(bookId)
                .then(() => {
                    navigate('/catalog');
                });
        }
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
                    <img className={styles.image} src={currentBook.imageUrl} />
                    <h1>{currentBook.title}</h1>
                    <h2>{currentBook.author}</h2>
                    <h3>{currentBook.genre}, {currentBook.year}</h3>
                    <h3>Price: {currentBook.price}$</h3>
                    <p>Summary: {currentBook.summary}</p>
                    <div className={likesStyle}>
                        <p>Likes: {totalLikes}</p>
                        {isLiked
                            ?   <p>You already liked this book!</p>
                            : <></>
                        }
                    </div>

                    {isOwner
                        ? <div className={styles.buttons}>
                            <Link className={styles["btn-edit"]} to={`/catalog/${currentBook._id}/edit`}>Edit</Link>
                            <button onClick={bookDeleteHandler} className={styles["btn-delete"]}>Delete</button>
                        </div>
                        : <></>
                    }

                    {showLikeButton
                        ? <div className={styles.buttons}>
                            <button onClick={bookLikeHandler} className={styles["btn-like"]}>Like</button>
                        </div>
                        : <></>
                    }
                </div>

                <div className={styles["comments-part"]}>
                    <div className={styles.comments}>
                        <h1>Comments:</h1>                        
                            {comments?.map(x =>
                                <div key={x._id} className={styles["comment-item"]} >
                                    <p className={styles["comment-text"]}>{x.text}</p>
                                    <p className={styles["comment-userEmail"]}>by {x.user.email}</p>
                                </div>
                            )}                       

                        {!comments.length &&
                            <p >No comments.</p>
                        }
                    </div>

                    {!isOwner
                        ? <div className={styles["add-comment"]}>
                            <h2>Add new comment:</h2>
                            <form onSubmit={addCommentHandler}>
                                <textarea name="comment" placeholder="Please write your comment here" />
                                <input className={styles["btn-add-comment"]} type="submit" value="Add Comment" />
                            </form>
                        </div>
                        : <></>}
                </div>
            </div>
        </section>
    );
};

export default BookDetails;