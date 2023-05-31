import React, { useCallback, useContext } from 'react';
import './CreateService.css';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useMutation, gql, useQuery } from '@apollo/client';
import ImageDropZone from '../../components/image-drop-zone/ImageDropZone';
import UserContext from '../../UserContext';

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
    mutation CreateService($title: String!, $description: String!, $category: ID!, $images: [String]!, $price: Float!) {
        createService(service: {title: $title, description: $description, category: $category, images: $images, price: $price}) {
            _id
        }
    }
`;

const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            _id
            name
        }
    }
`;

const MULTIPLE_UPLOAD = gql`
    mutation MultipleUpload($files: [Upload!]!) {
        multipleUpload(files: $files) {
            filename
            mimetype
            encoding
            cloudinaryUrl
        }
    }
`;

function CreateService() {

    const navigate = useNavigate();

    const userId = useContext(UserContext).userId;

    const [createService, { data: serviceData, loading: serviceLoading, error: serviceError, reset: serviceReset }] = useMutation(CREATE_SERVICE);

    const { loading, error, data } = useQuery(GET_CATEGORIES);

    const [multipleUpload, { data: multipleUploadData, loading: multipleUploadLoading, error: multipleUploadError, reset: multipleUploadReset }] = useMutation(MULTIPLE_UPLOAD);

    if (!serviceError && serviceData) {
        navigate('/user/' + userId);
    }

    const formik = useFormik({
        initialValues: {
            service_title: '',
            service_description: '',
            service_category: '',
            service_images: [],
            service_price: 0.00,
        },
        validate,
        onChange: values => {
            console.log(values);
        },
        onSubmit: values => {

            multipleUpload({ variables: { files: values.service_images } }).then((result) => {
                const images = result.data.multipleUpload.map((image) => {
                    return image.cloudinaryUrl;
                });
                createService({ variables: { title: values.service_title, description: values.service_description, category: values.service_category, images: images, price: values.service_price } });
            });
            
            serviceReset();
        },
    });

    // if(uploadData){
    //     const images = uploadData.multipleUpload.map((image) => {
    //         return image.cloudinaryUrl;
    //     });
    //     createService({ variables: { title: formik.values.service_title, description: formik.values.service_description, category: formik.values.service_category, images: images, price: formik.values.service_price } });
    // }

    return (
        <div className='create-service__container col-xs-12 col-sm-12 col-md-8 col-lg-6'>
            <h1>Create Service</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className='input__container'>
                    <label htmlFor="service_title">Title</label>
                    <input
                        id="service_title"
                        name="service_title"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.service_title}
                    />
                    {formik.touched.service_title && formik.errors.service_title ? (
                        <p className="info__validation email__validation">{formik.errors.service_title}</p>
                    ) : null}
                </div>
                <div className='input__container'>
                    <label htmlFor="service_description">Description</label>
                    <textarea
                        id="service_description"
                        name="service_description"
                        rows={10}
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.service_description}
                    />
                    {formik.touched.service_description && formik.errors.service_description ? (
                        <p className="info__validation email__validation">{formik.errors.service_description}</p>
                    ) : null}
                </div>
                {data &&
                    <div className='input__container'>
                        <label htmlFor="service_category">Category</label>
                        <select
                            id="service_category"
                            name="service_category"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.service_category}
                        >
                            <option value="" label="Select a category" />
                            {data.categories.map((category) => (
                                <option key={category._id} value={category._id} label={category.name} />
                            ))}
                        </select>
                        {formik.touched.service_category && formik.errors.service_category ? (
                            <p className="info__validation email__validation">{formik.errors.service_category}</p>
                        ) : null}
                    </div>
                }
                <div className='input__container'>
                    <label htmlFor="service_images">Add Images</label>
                    <ImageDropZone
                        onDrop={useCallback(acceptedFiles => {
                            formik.setFieldValue('service_images', acceptedFiles);
                        }, [])}
                    />
                    {formik.touched.service_images && formik.errors.service_images ? (
                        <p className="info__validation email__validation">{formik.errors.service_images}</p>
                    ) : null}
                </div>
                <div className='input__container'>
                    <label htmlFor="service_price">Price</label>
                    <input
                        id="service_price"
                        name="service_price"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.service_price}
                    />
                    {formik.touched.service_price && formik.errors.service_price ? (
                        <p className="info__validation email__validation">{formik.errors.service_price}</p>
                    ) : null}
                </div>
                <button className='create-service__submit-button' type="submit">Submit</button>
            </form >
        </div >
    )
}

export default CreateService;