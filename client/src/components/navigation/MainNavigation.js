import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import Notifications from "../notifications/Notifications";

const MainNavigation = () => {
    const handleUserDropdownClick = () => {
        // TODO: handle user dropdown click
    };

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

    return (
        <header>
            <NavLink to="/" activeClassName="active-link">
                <div className="main-navigation__logo">FreelanceConnect</div>
            </NavLink>
            <div className="main-navigation__search-container">
                <input
                    type="text"
                    placeholder="Search for services"
                    className="main-navigation__search-input"
                />
                <button className="main-navigation__search-button">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <div className="main-navigation__nav-icons">
                <NavLink to="/messages" activeClassName="active-link">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                </NavLink>
                {/* <NavLink to="/notifications" activeClassName="active-link"> */}
                    {/* <i className="fa fa-bell" aria-hidden="true"></i> */}
                    <Notifications notifications={notifications} />
                {/* </NavLink> */}
                <NavLink to="/saved" activeClassName="active-link">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                </NavLink>
                <a href="/" onClick={handleUserDropdownClick}>
                    <i className="fa fa-user" aria-hidden="true"></i>
                    {/* <div className="main-navigation__user-dropdown">
                        <a href="/">Profile</a>
                        <a href="/">Settings</a>
                        <a href="/">Logout</a>
                    </div> */}
                </a>
            </div>
        </header>
    );
};

export default MainNavigation;