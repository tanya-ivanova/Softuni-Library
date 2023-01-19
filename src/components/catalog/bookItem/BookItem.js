import { Link } from 'react-router-dom';
import styles from './BookItem.module.css';


const BookItem = () => {
    return (
        <section className={styles["catalog-page"]}>
            <div className={styles["book-item-wrapper"]}>
                <img src="https://upload.wikimedia.org/wikipedia/en/8/8b/TheWayOfKings.png" />                
                <h1>The Way of Kings</h1>
                <h2>Brandon Sanderson</h2>
                <h3>Fantasy</h3>
                <Link className={styles["btn-details"]} to="/details">Details</Link>                
            </div>

            <div className={styles["book-item-wrapper"]}>
                <img src="https://upload.wikimedia.org/wikipedia/en/e/e0/WordsOfRadianceCover.png" />                
                <h1>Words of Radiance</h1>
                <h2>Brandon Sanderson</h2>
                <h3>Fantasy</h3>
                <Link className={styles["btn-details"]} to="/details">Details</Link>                
            </div>

            <div className={styles["book-item-wrapper"]}>
                <img src="https://upload.wikimedia.org/wikipedia/en/5/5d/Brandon_Sanderson_Oathbringer_book_cover.jpg" />                
                <h1>Oathbringer</h1>
                <h2>Brandon Sanderson</h2>
                <h3>Fantasy</h3>
                <Link className={styles["btn-details"]} to="/details">Details</Link>                
            </div>

            <div className={styles["book-item-wrapper"]}>
                <img src="https://upload.wikimedia.org/wikipedia/en/6/64/Rhythm_of_War_cover.jpg" />                
                <h1>Rhythm of War</h1>
                <h2>Brandon Sanderson</h2>
                <h3>Fantasy</h3>
                <Link className={styles["btn-details"]} to="/details">Details</Link>                
            </div>

            <div className={styles["book-item-wrapper"]}>
                <img src="https://upload.wikimedia.org/wikipedia/en/0/00/WoT01_TheEyeOfTheWorld.jpg" />                
                <h1>The eye of the world</h1>
                <h2>Robert Jordan</h2>
                <h3>Fantasy</h3>
                <Link className={styles["btn-details"]} to="/details">Details</Link>                
            </div>
        </section>        
    );
};

export default BookItem;