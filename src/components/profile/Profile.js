import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as bookService from '../../services/bookService';

import BookItem from "../catalog/bookItem/BookItem";
import styles from './Profile.module.css';

const Profile = () => {
    const { user } = useContext(AuthContext);     

    const [books, setBooks] = useState([]);

    useEffect(() => {
        bookService.getByUserId(user._id)
            .then(result => {                
                setBooks(result);                
            });
    }, []);

    return (
        <section className={styles["profile-page"]}>           
           
            {books.length > 0
                ? books.map(x => <BookItem key={x._id} book={x} />)
                : <h3>No books yet</h3>
            }           
            
        </section>
    );
};

export default Profile;