import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as bookService from '../../services/bookService';
import BookItem from "../catalog/bookItem/BookItem";
import Spinner from "../common/Spinner/Spinner";
import styles from './Profile.module.css';

const Profile = () => {
    const { user } = useContext(AuthContext); 
    
    const [isLoading, setIsLoading] = useState(true);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        bookService.getByUserId(user._id)
            .then(result => {                
                setBooks(result);
                setIsLoading(false);                
            });
    }, []);

    if(isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }

    return (
        <section className={styles["profile-page"]}>           
           
            {books.length > 0
                ? books.map(x => <BookItem key={x._id} book={x} />)
                : <h2 className="message-when-no-data">No books yet</h2>
            }           
            
        </section>
    );
};

export default Profile;