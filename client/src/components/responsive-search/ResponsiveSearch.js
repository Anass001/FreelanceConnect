import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import './ResponsiveSearch.css';

const validate = values => {
    const errors = {};
    if (!values.search_query) {
        errors.search_query = "Required";
    }
    return errors;
};

function ResponsiveSearch() {

    const navigate = useNavigate();

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
        <div className="responsive-search">
            <div className="responsive-search__icon">
                <span className="material-symbols-outlined">search</span>
            </div>
            <div className="responsive-search__wrapper">
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
            </div>
        </div>
    )
}

export default ResponsiveSearch;