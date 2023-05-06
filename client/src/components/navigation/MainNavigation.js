import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";

const MainNavigation = () => {
    const handleUserDropdownClick = () => {
        // TODO: handle user dropdown click
    };

    return (
        <header>
            <NavLink to="/" activeClassName="active-link">
                <div className="main-navigation__logo">FreelancerConnect</div>
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
                <NavLink to="/notifications" activeClassName="active-link">
                    <i className="fa fa-bell" aria-hidden="true"></i>
                </NavLink>
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