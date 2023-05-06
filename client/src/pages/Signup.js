import React, { Component } from 'react';
import './Signup.css';
import { NavLink } from "react-router-dom";
import { Formik } from 'formik';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.fullnameInputRef = React.createRef();
        this.usernameInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.state = {
            error: ""
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const fullname = this.fullnameInputRef.current.value;
        const username = this.usernameInputRef.current.value;
        const email = this.emailInputRef.current.value;
        const password = this.passwordInputRef.current.value;

        if (fullname.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0) {
            this.setState({ error: "Please fill all the fields" });
            return;
        }

        let requestBody = {
            query: `
                mutation {
                    createUser(user: {full_name: "${fullname}", username: "${username}", email: "${email}", password: "${password}"}) {
                        id
                        full_name
                        username
                        email
                    }
                }
            `
        };

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    this.state.error = "Network error";
                    throw new Error('Failed');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);

                if (resData.errors) {
                    this.setState({ error: resData.errors[0].message });
                } else {
                    this.setState({ error: "" });
                    this.props.history.push('/login');
                }

                // if(resData.data)
                // if (resData.data.login.token) {
                //     this.props.setToken(resData.data.login.token);
                // }
            })
            .catch(err => {
                console.log(err);
            });

    };

    clearError = () => {
        this.setState({ error: "" });
    }

    render() {
        return (
            <div className='auth-signup__wrapper'>
                <div className="navbar">
                    <NavLink to="/" activeClassName="active-link">
                        <div className="navbar__logo">FreelancerConnect</div>
                    </NavLink>
                </div>
                <div className="signup__wrapper">
                    <h2 className="signup">Sign Up</h2>
                    {(this.state.error.trim().length !== 0) &&
                        <div className="error-message__wrapper">
                            <p className="error-message">{this.state.error.toString()}</p>
                            <button className="close-button" onClick={this.clearError}>
                                <span class="material-symbols-outlined" style={{ fontSize: 16 }}>
                                    close
                                </span>
                            </button>
                        </div>
                    }

                    <Formik
                        initialValues={{ email: '', password: '', confirmPassword: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            } else if (values.password.length < 8) {
                                errors.password = 'Password must be at least 8 characters long';
                            }
                            if (!values.confirmPassword) {
                                errors.confirmPassword = 'Required';
                            } else if (values.confirmPassword !== values.password) {
                                errors.confirmPassword = 'Passwords do not match';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={this.submitHandler}>
                                <label>
                                    <input type="text" placeholder='Full Name' ref={this.fullnameInputRef} />
                                </label>
                                <label>
                                    <input type="text" placeholder='Username' ref={this.usernameInputRef} />
                                </label>
                                <label>
                                    <input type="email" name="email" placeholder='Email' onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email} ref={this.emailInputRef} />
                                    <p className="info__validation email__validation">{errors.email}</p>
                                </label>
                                <label>
                                    <input type="password" name="password" placeholder='Password' onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password} ref={this.passwordInputRef} />
                                    <p className="info__validation password__validation">{errors.password}</p>
                                </label>
                                <label>
                                    <input type="password" name="confirmPassword" placeholder='Confirm password' onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword} ref={this.passwordInputRef} />
                                    <p className="info__validation password-confirmation__validation">{errors.confirmPassword}</p>
                                </label>
                                <div>
                                    <button className='signup-submit__button' disabled={isSubmitting} type="submit">Sign up</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                    <div className="login-link__wrapper">
                        <p className="login-link__text">Already have an account?</p>
                        <NavLink to="/login" activeClassName="active-link">
                            <p className="login-link">Login.</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;