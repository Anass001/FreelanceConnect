import React, { Component } from 'react';
import './Login.css';
import { NavLink } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.state = {
            error: ""
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailInputRef.current.value;
        const password = this.passwordInputRef.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            this.setState({ error: "Please fill all the fields" });
            return;
        }

        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
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
                }
                if (resData.data.login.token) {
                    this.props.setToken(resData.data.login.token);
                }
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
            <div className='auth-login__wrapper'>
                <div className="navbar">
                    <NavLink to="/" activeClassName="active-link">
                        <div className="navbar__logo">FreelancerConnect</div>
                    </NavLink>
                </div>
                <div className="login__wrapper">
                    <h2 className="login">Sign In</h2>
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
                    <form onSubmit={this.submitHandler}>
                        <label>
                            <input type="email" placeholder='Email' ref={this.emailInputRef} />
                        </label>
                        <label>
                            <p></p>
                            <input type="password" placeholder='Password' ref={this.passwordInputRef} />
                        </label>
                        <div>
                            <button className='signin-submit__button' type="submit">Sign in</button>
                        </div>
                    </form>
                    <div className="signup-link__wrapper">
                        <p className="signup-link__text">Don't have an account?</p>
                        <NavLink to="/signup" activeClassName="active-link">
                            <p className="signup-link">Sign up.</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;