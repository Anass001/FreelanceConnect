import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import Notifications from "../notifications/Notifications";
import UserOptions from "../user-options/UserOptions";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const validate = values => {
    const errors = {};
    if (!values.search_query) {
        errors.search_query = "Required";
    }
    return errors;
};

const MainNavigation = () => {
    const handleUserDropdownClick = () => {
        // TODO: handle user dropdown click
    };

    // react hook for navigation
    const navigate = useNavigate();


    const notifications = [
        {
            message: "You have a new message from John Doe",
            time: "2 hours ago",
        },
        {
            message: "You have a new message from John Doe",
            time: "2 hours ago",
        },
        {
            message: "You have a new message from John Doe",
            time: "2 hours ago",
        },
    ];

    const formik = useFormik({
        initialValues: {
            search_query: '',
        },
        validate,
        onChange: values => {
            console.log(values);
        },
        onSubmit: values => {
            console.log(values);
            navigate(`/search/${values.search_query}`);
        },
    });

    return (
        <header>
            <NavLink to="/" className="active-link">
                <div className="main-navigation__logo">FreelanceConnect</div>
            </NavLink>
            <form
                className="main-navigation__search-form"
                onSubmit={formik.handleSubmit}
            >
                <div className="main-navigation__search-container">
                    <input
                        type="text"
                        name="search_query"
                        id="search_query"
                        placeholder="Search for services"
                        className="main-navigation__search-input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.search_query}
                    />
                    <button
                        type="submit"
                        className="main-navigation__search-button">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
            <div className="main-navigation__nav-icons">
                {/* <NavLink to="/messages" activeClassName="active-link">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                </NavLink> */}
                {/* <NavLink to="/notifications" activeClassName="active-link"> */}
                {/* <i className="fa fa-bell" aria-hidden="true"></i> */}
                {/* <Notifications notifications={notifications} /> */}
                {/* </NavLink> */}
                {/* <NavLink to="/saved" activeClassName="active-link">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                </NavLink> */}
                <NavLink to="/orders" className="active-link">
                    <div className="nav-link__wrapper">
                        <span className="material-symbols-outlined">
                            receipt_long
                        </span>
                        <p>Orders</p>
                    </div>
                </NavLink>
                {/* <a href="/" onClick={handleUserDropdownClick}>
                    <i className="fa fa-user" aria-hidden="true"></i> */}
                {/* <div className="main-navigation__user-dropdown">
                        <a href="/">Profile</a>
                        <a href="/">Settings</a>
                        <a href="/">Logout</a>
                    </div> */}
                {/* </a> */}
                <UserOptions />
            </div>
        </header>
    );
};

export default MainNavigation;