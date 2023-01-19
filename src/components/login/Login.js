import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";


const Login = () => {
    const {userLogin} = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const {email, password} = Object.fromEntries(new FormData(e.target));
        
        authService.login(email, password)
            .then(authdata => {
                
                userLogin(authdata);
                navigate('/');
            })
            .catch(() => {
                navigate('/404');
            });
    }; 

    return (
        <section className={styles.login}>
            <div className={styles["login-wrapper"]}>
                <form className={styles["login-form"]} onSubmit={onSubmit}>

                    <h1>Login</h1>

                    <label htmlFor="login-email">Email</label>
                    <input type="email" id="login-email" name="email" />

                    <label htmlFor="login-password">Password</label>
                    <input type="password" name="password" id="login-password" />

                    <div className={styles["btn-login"]}>
                        <input type="submit" value="Login" />
                    </div>
                    <p>If you don't have an account click <Link to="/register">here</Link></p>

                </form>
            </div>
        </section>
    );
}

export default Login;