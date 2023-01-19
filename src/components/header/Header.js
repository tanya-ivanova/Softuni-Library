import { useContext } from "react";
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

import { AuthContext } from "../../contexts/AuthContext";


const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <section className={styles["header-section"]}>
            <header>
                <h1>
                    <Link to="/" className={styles["softuni-library"]}>Softuni Library</Link>
                </h1>

                <nav>
                    {user.email && <Link to="/my-books" className={styles.greeting}>Welcome, {user.email}</Link>}

                    <Link to="/catalog">All books</Link>

                    {user.accessToken
                        ? <div id="user">
                            <Link to="/my-books">My books</Link>
                            <Link to="/create">Add book</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                        : <div id="guest">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    }
                </nav>
            </header>
            
        </section>
    );
}

export default Header;