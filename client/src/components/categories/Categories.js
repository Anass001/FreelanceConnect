import React from "react";
import { NavLink } from "react-router-dom";
import "./Categories.css";

const Categories = () => {    

    return (
        <div className="categories">
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => {
                        if (isActive) return "active-link";
                        return "inactive-link";
                    }}>
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/categories/design" className={({ isActive }) => {
                        if (isActive) return "active-link";
                        return "inactive-link";
                    }}>
                        <span>Design</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/categories/web" className={({ isActive }) => {
                        if (isActive) return "active-link";
                        return "inactive-link";
                    }}>
                        <span>Web</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/categories/mobile" className={({ isActive }) => {
                        if (isActive) return "active-link";
                        return "inactive-link";
                    }}>
                        <span>Mobile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/categories/photography" className={({ isActive }) => {
                        if (isActive) return "active-link";
                        return "inactive-link";
                    }}>
                        <span>Photography</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Categories;