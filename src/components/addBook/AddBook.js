import { useNavigate } from 'react-router-dom';
import * as bookService from '../../services/bookService';
import styles from './AddBook.module.css';


const AddBook = () => {
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        //const bookData = Object.fromEntries(new FormData(e.target));

        const formData = new FormData(e.target);

        const bookData = {
            title: formData.get('title'),
            author: formData.get('author'),
            genre: formData.get('genre'),
            imageUrl: formData.get('imageUrl'),
            year: formData.get('year'),
            price: formData.get('price'),
            summary: formData.get('summary'),
        };

        if (bookData.title === '' || bookData.author === '' || bookData.genre === '' || bookData.imageUrl === ''
         || bookData.year === '' || bookData.price === '' || bookData.summary === '') {
            return alert('All fields are required!');
        }

        bookService.create(bookData)
            .then(() => {
                e.target.reset();                
                navigate(`/catalog`);
            });        
    };

    return (        
        <section className={styles["add-book-page"]}>
            <div className={styles["add-book-wrapper"]}>
                <form className={styles["add-book-form"]} onSubmit={onSubmit} >

                    <h1>Add Book</h1>
                    <label htmlFor="leg-title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                    />

                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                    />

                    <label htmlFor="genre">Genre</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                    />

                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                    />

                    <label htmlFor="year">Year</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                    />

                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                    />

                    <label htmlFor="summary">Summary</label>
                    <textarea name="summary" id="summary" defaultValue={""} />

                    <div className={styles["btn-add-book"]}>
                        <input type="submit" value="Add Book" />
                    </div>

                </form>
            </div>
        </section>
    );
};

export default AddBook;