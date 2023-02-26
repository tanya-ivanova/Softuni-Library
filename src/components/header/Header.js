import { useContext } from "react";
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import {languages} from '../../languages/languages';


const Header = () => {
    const { user } = useContext(AuthContext);
    const {setAppLanguage, language} = useContext(LanguageContext);

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
                    {user.email && <Link to="/profile" className={styles.greeting}>{languages.welcome[language]} {user.email}</Link>}

                    <Link to="/catalog">{languages.allBooks[language]}</Link>

                    {user.accessToken
                        ? <div id="user">
                            <Link to="/profile">{languages.myBooks[language]}</Link>
                            <Link to="/create">{languages.addBook[language]}</Link>
                            <Link to="/search">{languages.search[language]}</Link>
                            <Link to="/searchInGoogle">SearchInGoogle</Link>
                            <Link to="/logout">{languages.logout[language]}</Link>
                        </div>
                        : <div id="guest">
                            <Link to="/login">{languages.login[language]}</Link>
                            <Link to="/register">{languages.register[language]}</Link>
                        </div>
                    }
                </nav>
            </header>
            
        </section>
    );
}

export default Header;