import React, { Component } from 'react';
import './Signup.css';
import { NavLink } from "react-router-dom";
import ShowAndHidePassword from '../components/password/ShowAndHidePassword';

class Signup extends Component {
    
    constructor(props) {
        super(props);
        this.fullnameInputRef = React.createRef();
        this.usernameInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();
        const fullname = this.fullnameInputRef.current.value;
        const username = this.usernameInputRef.current.value;
        const email = this.emailInputRef.current.value;
        const password = this.passwordInputRef.current.value;

        if (fullname.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0) {
            console.log("hello")
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
                    throw new Error('Failed');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);

                // if (resData.data.login.token) {
                //     this.props.setToken(resData.data.login.token);
                // }
            })
            .catch(err => {
                console.log(err);
            });

    };

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
                    <form onSubmit={this.submitHandler}>
                        <label>
                            <input type="text" placeholder='Full Name' ref={this.fullnameInputRef} />
                        </label>
                        <label>
                            <p></p>
                            <input type="text" placeholder='Username' ref={this.usernameInputRef} />
                        </label>
                        <label>
                            <p></p>
                            <input type="email" placeholder='Email' ref={this.emailInputRef} />
                        </label>
                        <label>
                            <p></p>
                            <input type="email" placeholder='Password' ref={this.passwordInputRef} />
                        </label>
                        <label>
                            <p></p>
                            <input type="email" placeholder='Confirm password' ref={this.passwordInputRef} />
                        </label>
                        <div>
                            <button className='signup-submit__button' type="submit">Sign up</button>
                        </div>
                    </form>
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