import React, { Component, useState } from 'react';
import './Signup.css';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const REGISTER_USER = gql`
    mutation Register($fullname: String!, $username: String!, $email: String!, $password: String!) {
        register(fullname: $fullname, username: $username, email: $email, password: $password) {
            id
            fullname
            username
            email
        }
    }
`;


function Signup_() {

    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: values => {
            if (values.fullname.trim().length === 0 || values.email.trim().length === 0 || values.password.trim().length === 0 || values.username.trim().length === 0) {
                this.setState({ error: "Please fill all the fields" });
                return;
            }
            registerUser({
                variables: {
                    fullname: values.fullname,
                    username: values.username,
                    email: values.email,
                    password: values.password
                }
            });
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className='auth-signup__wrapper'>
            <div className="navbar">
                <NavLink to="/" activeClassName="active-link">
                    <div className="navbar__logo">FreelancerConnect</div>
                </NavLink>
            </div>
            <div className="signup__wrapper">
                <h2 className="signup">Sign Up</h2>
                {error &&
                    <div className="error-message__wrapper">
                        <p className="error-message">{error}</p>
                        <button className="close-button" onClick={true}>
                            <span class="material-symbols-outlined" style={{ fontSize: 16 }}>
                                close
                            </span>
                        </button>
                    </div>
                }
                <form onSubmit={formik.handleSubmit}>
                    <label>
                        <input type="text" id="fullname" name='fullname' placeholder='Full Name' onChange={formik.handleChange} value={formik.values.fullname} />
                    </label>
                    <label>
                        <input type="text" id="username" name='username' placeholder='Username' onChange={formik.handleChange} value={formik.values.username} />
                    </label>
                    <label>
                        <input type="email" id="email" name="email" placeholder='Email' onChange={formik.handleChange} value={formik.values.email} />
                        <p className="info__validation email__validation">{formik.errors.email}</p>
                    </label>
                    <label>
                        <input type="password" id="password" name="password" placeholder='Password' onChange={formik.handleChange} value={formik.values.password} />
                        <p className="info__validation password__validation">{formik.errors.password}</p>
                    </label>
                    <label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm password' onChange={formik.handleChange} value={formik.values.confirmPassword} />
                        <p className="info__validation password-confirmation__validation">{formik.errors.confirmPassword}</p>
                    </label>
                    <div>
                        {loading ? <button className='signup-submit__button' type="submit">Loading...</button> : <button className='signup-submit__button' type="submit">Sign up</button>}
                    </div>
                </form>
                <div className="login-link__wrapper">
                    <p className="login-link__text">Already have an account?</p>
                    <NavLink to="/" activeClassName="active-link">
                        <p className="login-link">Login.</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}