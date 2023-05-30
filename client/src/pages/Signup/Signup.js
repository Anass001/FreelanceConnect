import React, { useState } from 'react';
import './Signup.css';
import { useFormik } from 'formik';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};

const CREATE_USER = gql`
  mutation CreateUser($full_name: String!, $username: String!, $email: String!, $password: String!) {
    createUser(user: {full_name: $full_name, username: $username, email: $email, password: $password}) {
      _id
    }
  }
`;


function Signup() {

    const navigate = useNavigate();

    const [createUser, { data, loading, error, reset}] = useMutation(CREATE_USER);

    const [emptyFieldsError, setEmptyFieldsError] = useState(false);

    const clearError = () => {
        reset();
        setEmptyFieldsError(false);
    }

    if(!error && data){
        navigate('/login');
    }

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
                setEmptyFieldsError(true);
                console.log('empty fields');
                return;
            }
            createUser({
                variables: {
                    full_name: values.fullname,
                    username: values.username,
                    email: values.email,
                    password: values.password
                }
            });
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
                        <input type="text" id="fullname" name='fullname' placeholder='Full Name' onChange={formik.handleChange} value={formik.values.fullname} />
                    </label>
                    <label class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <input type="text" id="username" name='username' placeholder='Username' onChange={formik.handleChange} value={formik.values.username} />
                    </label>
                    <label class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <input type="email" id="email" name="email" placeholder='Email' onChange={formik.handleChange} value={formik.values.email} />
                        <p className="info__validation email__validation">{formik.errors.email}</p>
                    </label>
                    <label class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <input type="password" id="password" name="password" placeholder='Password' onChange={formik.handleChange} value={formik.values.password} />
                        <p className="info__validation password__validation">{formik.errors.password}</p>
                    </label>
                    <label class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm password' onChange={formik.handleChange} value={formik.values.confirmPassword} />
                        <p className="info__validation password-confirmation__validation">{formik.errors.confirmPassword}</p>
                    </label>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        {loading ? <button className='signup-submit__button' type="submit">Loading...</button> : <button className='signup-submit__button' type="submit">Sign up</button>}
                    </div>
                </form>
                <div className="login-link__wrapper">
                    <p className="login-link__text">Already have an account?</p>
                    <NavLink to="/login" activeClassName="active-link">
                        <p className="login-link">Login</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Signup;