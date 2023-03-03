import { useContext } from "react";
import { Link } from 'react-router-dom';

import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';

import styles from './Header.module.css';

const Header = () => {
    const { user } = useContext(AuthContext);
    const { setAppLanguage, language } = useContext(LanguageContext);

    const setBulgarianLanguage = () => {
        setAppLanguage('bulgarian');
    };

    const setEnglishLanguage = () => {
        setAppLanguage('english');
    };


    return (
        <section className={styles["header-section"]}>
            <header>
                <h1>
                    <Link to="/" className={styles["softuni-library"]}>{languages.softuniLibrary[language]}</Link>
                </h1>

                <button className={styles["button-bg"]} onClick={setBulgarianLanguage}>BG</button>
                <button className={styles["button-en"]} onClick={setEnglishLanguage}>EN</button>             

                <nav>
                    <ul>
                        {user.email && <Link className={styles.greeting}>{languages.welcome[language]} {user.email}</Link>}
                        <li><Link to="/catalog">{languages.allBooks[language]}</Link></li>

                        {user.accessToken
                            ? <>
                                <li><Link to="/profile">{languages.myBooks[language]}</Link></li>
                                <li><Link to="/create">{languages.addBook[language]}</Link></li>
                                <li>
                                    <Link>{languages.search[language]}</Link>
                                    <ul>
                                        <li><Link to="/search">{languages.search[language]}</Link></li>
                                        <li><Link to="/searchInGoogle">{languages.googleSearch[language]}</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/logout">{languages.logout[language]}</Link></li>
                            </>
                            : <>
                                <Link to="/login">{languages.login[language]}</Link>
                                <Link to="/register">{languages.register[language]}</Link>
                            </>
                        }

                    </ul>
                </nav>
            </header>

        </section >
    );
}

export default Header;