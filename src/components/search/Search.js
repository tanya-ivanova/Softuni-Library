import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import * as bookService from '../../services/bookService';
import BookItem from "../catalog/bookItem/BookItem";
import Notification from "../common/notification/Notification";
import Pager from "../common/pager/Pager";
import Spinner from "../common/spinner/Spinner";
import styles from './Search.module.css';

const Search = () => {
    const { language } = useContext(LanguageContext);

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    const [criteria, setCriteria] = useState('');

    const [showNotification, setShowNotification] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [pages, setPages] = useState(1);

    const location = useLocation();

    let queryAll = new URLSearchParams(location.search).get("query") || '';
    let page = 1;
    let query;

    if (queryAll) {

        query = queryAll.split('?')[0];

        if (queryAll.split('?')[1]) {
            page = Number(queryAll.split('?')[1].split('=')[1]);
        }
    }


    useEffect(() => {
        if (query && criteria) {            
            bookService.search(criteria, query, page)
                .then(({ books, pages }) => {
                    setSearchResults(books);
                    setPages(pages);
                    setIsLoading(false);
                });
        } 
    }, [page, criteria, query]);

    
    useEffect(() => {
        if (criteria === '' || search === '') {
            setShowNotification(true);
        } else {
            setShowNotification(false);
        }
    }, [criteria, search]);

    if (isLoading) {
        return (
            <div className="spinner">
                <Spinner />
            </div>
        )
    }

    const changeValueHandler = (e) => {
        setSearch(e.target.value)
    };

    const onSearchCriteriaChange = (e) => {
        setCriteria(e.target.value);
    }

    const onSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${search}`);
        setIsLoading(true);
    };

    return (
        <>
            <section className={styles["search-page"]}>
                {showNotification ? <Notification message={languages.selectCriteriaAndType[language]} /> : null}

                <div className={styles["form-wrapper"]}>

                    <form onSubmit={onSearch} className={styles["search-form"]}>
                        <div className={styles["criteria-wrapper"]}>
                            <span>{languages.searchBy[language]}: </span>
                            <select name="criteria" onChange={onSearchCriteriaChange} >
                                <option value="">{languages.pleaseSelect[language]}</option>
                                <option value="title">{languages.title[language]}</option>
                                <option value="author">{languages.author[language]}</option>
                                <option value="genre">{languages.genre[language]}</option>
                            </select>
                        </div>

                        <div className={styles["input-wrapper"]}>
                            <input
                                type="text"
                                name="search"
                                placeholder={languages.lookingFor[language]}
                                value={search}
                                onChange={changeValueHandler}
                            />

                            <button
                                type='submit'
                                disabled={showNotification}
                                className={styles[`${showNotification ? 'button-disabled' : ''}`]}
                            >
                                {languages.search[language]} <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </form>
                </div>

                <section className="pager">
                    <Pager page={page} pages={pages} query={query} />
                </section>

                <div className={styles["results-wrapper"]}>
                    {searchResults.length > 0
                        ? searchResults.map(x => <BookItem key={x._id} book={x} />)
                        : <h2 className="message-when-no-data">{languages.noResults[language]}</h2>
                    }
                </div>
            </section>
            <section className="pager">
                <Pager page={page} pages={pages} query={query} />
            </section>
        </>
    );
};

export default Search;