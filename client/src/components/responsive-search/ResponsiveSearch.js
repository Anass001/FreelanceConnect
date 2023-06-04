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
        onReset: values => {
            console.log(values);
        }
    });

    return (
        <div className="responsive-search">
            <div className="responsive-search__icon" onClick={() => {
                document.getElementsByClassName("responsive-search__wrapper")[0].style.width = "100%";
            }}>
                <span className="material-symbols-outlined">search</span>
            </div>
            <div className="responsive-search__wrapper">
                <form
                    className="main-navigation__responsive-search-form"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="main-navigation__responsive-search-container">
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
                    </div>
                </form>
                <div className="responsive-search__close-icon" onClick={() => {
                    document.getElementsByClassName("responsive-search__wrapper")[0].style.width = "0px";
                    formik.resetForm();
                }}>
                    <span className="material-symbols-outlined">close</span>
                </div>
            </div>
        </div>
    )
}

export default ResponsiveSearch;