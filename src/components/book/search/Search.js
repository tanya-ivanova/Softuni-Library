import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { LanguageContext } from "../../../contexts/LanguageContext";
import { languages } from '../../../languages/languages';
import * as bookService from '../../../services/bookService';
import { parseQueryAll } from '../../../utils/utils';
import BookItem from "../catalog/bookItem/BookItem";
import SearchForm from './SearchForm';
import Pager from "../../common/pager/Pager";
import Spinner from "../../common/spinner/Spinner";

import styles from './Search.module.css';

const Search = () => {
    const { language } = useContext(LanguageContext);

    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);

    const [criteria, setCriteria] = useState('title');
    const [search, setSearch] = useState("");

    const [pages, setPages] = useState(1);

    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();

    let queryAll = new URLSearchParams(location.search).get("query") || '';
    let query;
    let searchBy;
    let page = 1;    

    if(queryAll) {
        ({query, searchBy, page} = parseQueryAll(queryAll, query, searchBy, page));
    }

    useEffect(() => {
        setSearch(query || '');
        setCriteria(searchBy || 'title');
    }, [query, searchBy]);

    useEffect(() => {
        if (query && searchBy) {
            setIsLoading(true);

            bookService.search(searchBy, query, page)
                .then(({ books, pages }) => {
                    setSearchResults(books);
                    setPages(pages);
                    setIsLoading(false);
                })
                .catch(error => {
                    alert(error.message);
                    console.log(error.message)
                });
        }
        else {
            setSearchResults([]);
        }
    }, [page, searchBy, query]);

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
        navigate(`/search?query=${search}?searchBy=${criteria}`);
    };

    return (
        <>
            <section className={styles["search-page"]}>
                <h1 className={styles["search-title"]}>{languages.searchInSite[language]}</h1>

                <SearchForm
                    onSearch={onSearch}
                    criteria={criteria}
                    onSearchCriteriaChange={onSearchCriteriaChange}
                    search={search}
                    changeValueHandler={changeValueHandler}
                    showOptionGenre={true}
                />

                {searchResults.length > 0 &&
                    <section className="pager">
                        <Pager 
                            page={page} 
                            pages={pages} 
                            query={query} 
                            searchBy={searchBy}
                        />
                    </section>
                }

                <div className={styles["results-wrapper"]}>
                    {searchResults.length > 0
                        ? searchResults.map(x => <BookItem key={x._id} book={x} />)
                        : <h2 className="message-when-no-data">{languages.noResults[language]}</h2>
                    }
                </div>
            </section>

            {searchResults.length > 0 &&
                <section className="pager">
                    <Pager 
                        page={page} 
                        pages={pages} 
                        query={query} 
                        searchBy={searchBy}
                    />
                </section>
            }
        </>
    );
};

export default Search;
