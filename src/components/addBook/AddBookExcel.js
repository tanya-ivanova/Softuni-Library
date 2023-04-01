import { useContext } from 'react';
import readXlsxFile from 'read-excel-file';
import * as bookService from '../../services/bookService';
import { AuthContext } from '../../contexts/AuthContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

import { languages } from '../../languages/languages';

import styles from './AddBookExcel.module.css';

const schema = {
    'Title': {
        prop: 'title',
        type: String,
        required: true
    },
    'Author': {
        prop: 'author',
        type: String,
        required: true
    },
    'Genre': {
        prop: 'genre',
        type: String,
        required: true
    },
    'Image URL': {
        prop: 'imageUrl',
        type: String,
    },
    'Year': {
        prop: 'year',
        type: Number,
    },
    'Summary': {
        prop: 'summary',
        type: String,
    },
}

const AddBookExcel = () => {
    const { user } = useContext(AuthContext);
    const { language } = useContext(LanguageContext);

    const navigate = useNavigate();

    const getFile = (e) => {
        readXlsxFile(e.target.files[0], { schema })
            .then(({ rows, errors }) => {
                rows.forEach(book => {
                    book.ownerEmail = user.email;
                    bookService.create(book);
                });

                navigate(`/catalog`);
            });
    };

    return (
        <section className={styles["add-book-excel-page"]}>
            <div>
                <h1 className={styles["add-book-excel-title"]}>{languages.addBooksFromExcelTitle[language]}</h1>
                <p className={styles["add-book-excel-explanation"]}>{languages.addBooksFromExcelParagraph1[language]}</p>
                <p className={styles["add-book-excel-explanation"]}>{languages.addBooksFromExcelParagraph2[language]}</p>
                <p className={styles["add-book-excel-chooseFileParagraph"]}>{languages.addBooksFromExcelChooseFile[language]}</p>
                
                <input
                    type="file"                    
                    onChange={getFile}
                />
            </div>
        </section>
    );
};

export default AddBookExcel;