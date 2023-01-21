import { Link } from 'react-router-dom';
import styles from './BookItem.module.css';


const BookItem = ({ book }) => {
    return (
        <div className={styles["book-item-wrapper"]}>
            <img src={book.imageUrl} />
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <h3>{book.genre}</h3>
            <Link className={styles["btn-details"]} to={`/catalog/${book._id}/details`}>Details</Link>
        </div>
    );
};

export default BookItem;