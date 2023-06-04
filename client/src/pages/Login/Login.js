import React, { useState } from 'react';
import './Login.css';
import { useFormik } from 'formik';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from '@apollo/client';
import Cookies from 'js-cookie';

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
};

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        userId
        token
        tokenExpiration
    }
  }
`;

function Login() {

    const navigate = useNavigate();

    const [login, { loading, error, data }] = useLazyQuery(LOGIN);

    const [emptyFieldsError, setEmptyFieldsError] = useState(false);

    const clearError = () => {
        // reset();
        setEmptyFieldsError(false);
    }

    if (!error && data) {
        Cookies.set('token', data.login.token, { expires: data.login.tokenExpiration });
        Cookies.set('isFreelancer', 'true', { expires: data.login.tokenExpiration });
        // Cookies.set('userId', data.login.userId, { expires: data.login.tokenExpiration});
        navigate('/home');
        window.location.reload();
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            if (values.email.trim().length === 0 || values.password.trim().length === 0) {
                setEmptyFieldsError(true);
                console.log('empty fields');
                return;
            }
            login({
                variables: {
                    email: values.email,
                    password: values.password
                }
            });
        },
    });

    return (
        <div className='auth-login__wrapper'>
            <div className="navbar">
                <NavLink to="/" activeClassName="active-link">
                    <div className="navbar__logo">FreelancerConnect</div>
                </NavLink>
            </div>
            <div className="login__wrapper">
                <h2 className="login">Sign In</h2>
                {(error || emptyFieldsError) &&
                    <div className="error-message__wrapper">
                        <p className="error-message">{error.message}</p>
                        <button className="close-button" onClick={clearError}>
                            <span class="material-symbols-outlined" style={{ fontSize: 16 }}>
                                close
                            </span>
                        </button>
                    </div>
                }
                <form onSubmit={formik.handleSubmit}>
                    <label class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <input type="email" id="email" name="email" placeholder='Email' onChange={formik.handleChange} value={formik.values.email} />
                        <p className="info__validation email__validation">{formik.errors.email}</p>
                    </label>
                    <label class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <p></p>
                        <input type="password" id="password" name="password" placeholder='Password' onChange={formik.handleChange} value={formik.values.password} />
                        <p className="info__validation password__validation">{formik.errors.password}</p>
                    </label>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        {loading ? <button className='signin-submit__button' type="submit">Loading...</button> : <button className='signin-submit__button' type="submit">Login</button>}
                    </div>
                </form>
                <div className="signup-link__wrapper">
                    <p className="signup-link__text">Don't have an account?</p>
                    <NavLink to="/signup" activeClassName="active-link">
                        <p className="signup-link">Sign up</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Login;