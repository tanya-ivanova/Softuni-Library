import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

import Notification from "../common/notification/Notification";


const Register = () => {
    const { userLogin } = useContext(AuthContext);

    const navigate = useNavigate();

    const [showNotification, setShowNotification] = useState(true);
    const [showPassNotification, setShowPassNotification] = useState(false);

    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (values.email === '' || values.password === '' || values.confirmPassword === '') {
            setShowNotification(true);
        } else {
            setShowNotification(false);
        }
      }, [values.email, values.password, values.confirmPassword])

      useEffect(() => {
        if (values.password !== values.confirmPassword) {
            setShowPassNotification(true);
        } else {
            setShowPassNotification(false);
        }
      }, [values.password, values.confirmPassword])  


    const changeValueHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < bound
        }));
    };

    const EMAIL_PATTERN = /^[A-Za-z0-9]+@[a-z]+\.[a-z]+$/;

    const isValidEmail = (e) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: !EMAIL_PATTERN.test(e.target.value)
        }));
    };

    const isFormValid = !Object.values(errors).some(x => x);


    const onSubmit = (e) => {
        e.preventDefault();

        // if (values.email === '' || values.password === '' || values.confirmPassword === '') {
        //     return alert('All fields are required!');
        // }

        // if (values.password !== values.confirmPassword) {
        //     return alert('Passwords don\'t match!');
        // }

        authService.register(values.email, values.password)
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
            { showNotification ? <Notification message="All fields are required" /> : null }
            { showPassNotification ? <Notification message="Passwords don't match!" /> : null }

            <div className={styles["register-wrapper"]}>
                <form className={styles["register-form"]} onSubmit={onSubmit}>

                    <h1>Register</h1>

                    <label htmlFor="register-email">Email</label>
                    <input
                        type="email"
                        id="register-email"
                        name="email"
                        value={values.email}
                        onChange={changeValueHandler}
                        onBlur={isValidEmail}
                    />

                    {errors.email &&
                        <p className={styles.error}>
                            Invalid email!
                        </p>
                    }

                    <label htmlFor="register-password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        value={values.password}
                        onChange={changeValueHandler}
                        onBlur={(e) => minLength(e, 6)}
                    />

                    {errors.password &&
                        <p className={styles.error}>
                            Password should be at least 6 characters long!
                        </p>
                    }

                    <label htmlFor="confirm-register-password">Re-enter password</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirm-register-password"
                        value={values.confirmPassword}
                        onChange={changeValueHandler}                         
                    />

                    <div className={styles["btn-register"]}>
                        <button 
                            type="submit" 
                            disabled={!isFormValid || showNotification || showPassNotification} 
                            className={styles[`${!isFormValid || showNotification || showPassNotification ? 'button-disabled' : ''}`]} 
                        >
                            Register
                        </button>
                    </div>

                    <p className={styles["account-message"]}>If you already have an account click <Link to="/login">here</Link></p>

                </form>
            </div>
        </section>
    );
}

export default Register;