import { useContext } from "react";
import { Link } from 'react-router-dom';

import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import { isUserAdmin } from "../../utils/utils";
import { ENGLISH_LANGUAGE } from "../../constants";
import { BULGARIAN_LANGUAGE } from "../../constants";

import styles from './Header.module.css';

const Header = () => {
    const { user } = useContext(AuthContext);

    const { setAppLanguage, language } = useContext(LanguageContext);

    const setLanguageFromHeaderButtons = (language) => {
        if (!Object.keys(languages.softuniLibrary).includes(language)) {
            language = ENGLISH_LANGUAGE;
        }
        setAppLanguage(language);
    };

    const isAdmin = isUserAdmin(user);

    return (
        <section className={styles["header-section"]}>
            <header>
                <div>
                    <h1>
                        <Link to="/" className={styles["softuni-library"]}>{languages.softuniLibrary[language]}</Link>
                    </h1>

                    <button className={styles["button-bg"]} onClick={() => setLanguageFromHeaderButtons(BULGARIAN_LANGUAGE)}>BG</button>
                    <button className={styles["button-en"]} onClick={() => setLanguageFromHeaderButtons(ENGLISH_LANGUAGE)}>EN</button>

                    {user.email && <Link className={styles.greeting}>{languages.welcome[language]} {user.email}</Link>}
                </div>

                <div>
                    <nav>
                        <ul>
                            {isAdmin
                                ? <li><Link to="/catalog-admin">{languages.allBooks[language]}</Link></li>
                                : <li><Link to="/catalog">{languages.allBooks[language]}</Link></li>
                            }

                            {user.email
                                ? <>
                                    {!isAdmin && (
                                        <>
                                            <li><Link to="/profile">{languages.myBooks[language]}</Link></li>
                                            
                                            <li>
                                                <Link>{languages.add[language]}</Link>
                                                <ul>
                                                    <li><Link to="/create">{languages.addBookSingle[language]}</Link></li>
                                                    <li><Link to="/create-from-excel">{languages.addBooksFromExcel[language]}</Link></li>
                                                </ul>
                                            </li>

                                            <li>
                                                <Link>{languages.search[language]}</Link>
                                                <ul>
                                                    <li><Link to="/search">{languages.searchInSite[language]}</Link></li>
                                                    <li><Link to="/searchInGoogle">{languages.googleSearch[language]}</Link></li>
                                                </ul>
                                            </li>
                                        </>
                                    )}
                                    <li><Link to="/logout">{languages.logout[language]}</Link></li>
                                </>
                                : <>
                                    <li><Link to="/login">{languages.login[language]}</Link></li>
                                    <li><Link to="/register">{languages.register[language]}</Link></li>
                                </>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </section >
    );
}

export default Header;
