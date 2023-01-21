import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";


const Register = () => {
    const {userLogin} = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const confirmPassword = formData.get('confirm-password').trim();

        if (email === '' || password === '' || confirmPassword === '') {            
            return alert('All fields are required!');
        }

        if (password !== confirmPassword) {            
            return alert('Passwords don\'t match!');
        }
        
        authService.register(email, password)
            .then(result => {
                const authData = {
                    _id: result._id,
                    email: result.email,
                    accessToken: result.accessToken
                };

                userLogin(authData);
                navigate('/');
            })
            .catch(() => {
                navigate('/404');
            });
    };

    return (
        <section className={styles.register}>
            <div className={styles["register-wrapper"]}>
                <form className={styles["register-form"]} onSubmit={onSubmit}>

                    <h1>Register</h1>

                    <label htmlFor="register-email">Email</label>
                    <input type="email" id="register-email" name="email" />

                    <label htmlFor="register-password">Password</label>
                    <input type="password" name="password" id="register-password" />

                    <label htmlFor="confirm-register-password">Re-enter password</label>
                    <input type="password" name="confirm-password" id="confirm-register-password" />

                    <div className={styles["btn-register"]}>
                        <input type="submit" value="Register" />
                    </div>

                    <p>If you already have an account click <Link to="/login">here</Link></p>

                </form>
            </div>
        </section>
    );
}

export default Register;