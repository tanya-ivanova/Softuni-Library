import styles from './BookDetails.module.css';
import { Link } from 'react-router-dom';


const BookDetails = () => {
    return (
        <section className={styles["details-page"]}>
            <div className={styles["details-wrapper"]}>
                <img src="https://upload.wikimedia.org/wikipedia/en/8/8b/TheWayOfKings.png" />                
                <h1>The Way of Kings</h1>
                <h2>Brandon Sanderson</h2>
                <h3>Fantasy</h3>
                <h3>2010</h3>
                <h3>20.00</h3>
                <p>Summary: The Way of Kings is an epic fantasy novel written by American author Brandon Sanderson and the first book in The Stormlight Archive series. The novel was published on August 31, 2010, by Tor Books. The Way of Kings consists of one prelude, one prologue, 75 chapters, an epilogue and 9 interludes. It was followed by Words of Radiance in 2014, Oathbringer in 2017 and Rhythm of War in 2020. A leatherbound edition was released in 2021.</p>
                <Link className={styles["btn-edit"]} to="/edit">Edit</Link>
                <Link className={styles["btn-delete"]} to="/delete">Delete</Link>
                <Link className={styles["btn-like"]} to="/like">Like</Link>                              
            </div>
        </section>
    );
};

export default BookDetails;