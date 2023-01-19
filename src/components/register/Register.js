import { Link } from 'react-router-dom';
import styles from './Register.module.css';


const Register = () => {

    return (
        <section className={styles.register}>
            <div className={styles["register-wrapper"]}>
                <form className={styles["register-form"]}>

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