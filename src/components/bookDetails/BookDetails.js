import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import * as bookService from '../../services/bookService';
import * as likeService from '../../services/likeService';
import styles from './BookDetails.module.css';


const BookDetails = () => {
    const { user } = useContext(AuthContext);
    const {bookId} = useParams();
    const navigate = useNavigate();

    const [currentBook, setCurrentBook] = useState([]);
    const [totalLikes, setTotalLikes] = useState();
    const [isLiked, setIsLiked] = useState();

    // useEffect(() => {
    //     bookService.getOne(bookId)
    //         .then(result => {                
    //             setCurrentBook(result);                
    //         });
    // }, []);

    useEffect(() => {
        Promise.all([
            bookService.getOne(bookId),
            likeService.getTotalLikesByBookId(bookId),
            user.accessToken ? likeService.getMyLikeByBookId(bookId, user._id) : 0
        ]).then((values) => {
            setCurrentBook(values[0]);
            setTotalLikes(values[1]);
            setIsLiked(values[2]);            
        });
    }, []);

    const isOwner = user._id && user._id === currentBook._ownerId;
    const showLikeButton = user._id != undefined && isOwner == false && isLiked == false;

    const bookDeleteHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this book?');
        if(confirmation) {
            bookService.remove(bookId)
                .then(() => {                    
                    navigate('/catalog');
                });
        }
    };

    const bookLikeHandler = () => {
        likeService.likeBook(bookId)
            .then(() => {
                navigate(`/catalog/${bookId}/details`);
            });
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
                <div className="fa fa-thumbs-up">
                    <p>Likes: {totalLikes}</p>
                </div>

                {isOwner
                    ?   <>   
                        <Link className={styles["btn-edit"]} to={`/catalog/${currentBook._id}/edit`}>Edit</Link>
                        <button onClick={bookDeleteHandler} className={styles["btn-delete"]}>Delete</button>
                        </>
                    : <></>
                }

                {showLikeButton
                    ?   <Link onClick={bookLikeHandler} className={styles["btn-like"]} to={`/catalog/${currentBook._id}/like`}>Like</Link>                                              
                    : <></>
                }
            </div>
        </section>
    );
};

export default BookDetails;