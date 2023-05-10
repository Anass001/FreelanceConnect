import React from 'react';
import './CreateService.css';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';

const validate = values => {
    const errors = {};
    if (!values.service_title) {
        errors.service_title = 'Required';
    } 
    else if (values.service_title.length > 60) {
        errors.service_title = 'Must be 60 characters or less';
    }

    if (!values.service_description) {
        errors.service_description = 'Required';
    } else if (values.service_description.length > 500) {
        errors.service_description = 'Must be 500 characters or less';
    }

    if (!values.service_category) {
        errors.service_category = 'Required';
    }

    if (!values.service_images) {
        errors.service_images = 'Required';
    }

    if (!values.service_price) {
        errors.service_price = 'Required';
    }
    else if (values.service_price > 9999.99) {
        errors.service_price = 'Must be 9999.99 or less';
    }

    return errors;
};

const CREATE_SERVICE = gql`
    mutation CreateService($service_title: String!, $service_description: String!, $service_category: String!, $service_images: [String]!, $service_price: Float!) {
        createService(service: {service_title: $service_title, service_description: $service_description, service_category: $service_category, service_images: $service_images, service_price: $service_price}) {
            id
        }
    }
`;

function CreateService() {

    const navigate = useNavigate();

    const [createService, { data, loading, error, reset }] = useMutation(CREATE_SERVICE);

    // if (!error && data) {
    //     navigate('/services');
    // }

    const formik = useFormik({
        initialValues: {
            service_title: '',
            service_description: '',
            service_category: '',
            service_images: '',
            service_price: 0.00,
        },
        validate,
        onSubmit: values => {
            console.log("hello")
        },
    });

    return (
        <div className='create-service__container'>
            <h1>Create Service</h1>
            <form onSubmit={formik.handleSubmit}>
                {/* <label htmlFor="service_title">Service Title</label> */}
                <input
                    id="service_title"
                    name="service_title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.service_title}
                />
                {/* {formik.touched.service_title && formik.errors.service_title ? (
                    <div>{formik.errors.service_title}</div>
                ) : null} */}
                {/* <label htmlFor="service_description">Service Description</label> */}
                <input
                    id="service_description"
                    name="service_description"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.service_description}
                />
                {/* {formik.touched.service_description && formik.errors.service_description ? (
                    <div>{formik.errors.service_description}</div>
                ) : null}
                <label htmlFor="service_category">Service Category</label> */}
                <input
                    id="service_category"
                    name="service_category"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.service_category}
                />
                {/* {formik.touched.service_category && formik.errors.service_category ? (
                    <div>{formik.errors.service_category}</div>
                ) : null}
                <label htmlFor="service_images">Service Images</label> */}
                <input
                    id="service_images"
                    name="service_images"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.service_images}
                />
                {/* {formik.touched.service_images && formik.errors.service_images ? (
                    <div>{formik.errors.service_images}</div>
                ) : null}
                <label htmlFor="service_price">Service Price</label> */}
                <input
                    id="service_price"
                    name="service_price"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.service_price}
                />
                {/* {formik.touched.service_price && formik.errors.service_price ? (
                    <div>{formik.errors.service_price}</div>
                ) : null} */}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateService;