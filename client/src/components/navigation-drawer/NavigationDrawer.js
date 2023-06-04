
import React, { useState, useRef } from 'react';
import './NavigationDrawer.css';
import { NavLink } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';


const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            _id
            name
            url_name
        }
    }
`;

function NavigationDrawer() {
    const [show, setShow] = useState(false);

    const { loading, error, data } = useQuery(GET_CATEGORIES);

    const showNavigationDrawer = () => {
        setShow(!show);
        document.getElementsByClassName("navigation-drawer__items")[0].style.width = "250px";
    };

    const closeNavigationDrawer = () => {
        setShow(false);
        document.getElementsByClassName("navigation-drawer__items")[0].style.width = "0px";
    };

    return (
        <div className="navigation-drawer__wrapper">
            <div className="navigation-drawer__icon" onClick={showNavigationDrawer}>
                <span className="material-symbols-outlined">menu</span>
            </div>

            <div className="navigation-drawer__items">

                <a href="javascript:void(0)" class="closebtn" onClick={closeNavigationDrawer}>
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </a>
                <a href="#">Home</a>
                <h6>CATEGORIES</h6>
                {
                    data &&
                    data.categories.map((category, index) => {
                        return (
                            <NavLink to={`/categories/${category.url_name}`} className="navigation-drawer__link" key={index}>
                                <span>{category.name}</span>
                            </NavLink>
                        );
                    }
                    )
                }
            </div>



        </div>
    )
}

export default NavigationDrawer;