import React from "react";
import { NavLink } from "react-router-dom";
import "./Categories.css";

function Categories({ categories }) {
    return (
        <div className="categories">
            <ul>
                <li>
                    <NavLink to="/home" className={({ isActive }) => {
                        if (isActive) return "active-link";
                        return "inactive-link";
                    }}>
                        <span>Home</span>
                    </NavLink>
                </li>
                {
                    categories.map((category, index) => {
                        return (
                            <li key={index}>
                                <NavLink to={`/categories/${category.url_name}`} className={({ isActive }) => {
                                    if (isActive) return "active-link";
                                    return "inactive-link";
                                }}>
                                    <span>{category.name}</span>
                                </NavLink>
                            </li>
                        );
                    }
                    )
                }
            </ul>
        </div>
    );
};

export default Categories;