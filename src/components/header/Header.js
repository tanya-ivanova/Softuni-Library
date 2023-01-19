import { Link } from 'react-router-dom';
import styles from './Header.module.css';


const Header = () => {

    return (
        <header>
            <h1>
                <Link to="/" className={styles["softuni-library"]}>Softuni Library</Link>
            </h1>

            <nav>
                <Link to="/catalog">All books</Link>
                
                <div id="user">
                    <Link to="/my-books">My books</Link>
                    <Link to="/create">Add book</Link>
                    <Link to="/logout">Logout</Link>
                </div>
                <div id="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;