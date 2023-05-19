import React from "react";
import { NavLink } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
    return (
        <div className="categories">
            <ul>
                <li>
                    <NavLink to="/" activeClassName="active-link">
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active-link">
                        <span>Design</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active-link">
                        <span>Web</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active-link">
                        <span>Mobile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active-link">
                        <span>Photography</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Categories;