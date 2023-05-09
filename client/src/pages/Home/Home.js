import React, { Component } from 'react';
import Categories from '../../components/categories/Categories';
import ServiceCard from '../../components/service-card/ServiceCard';

const service = {
    _id: '1',
    freelancer: {
        _id: '2',
        name: 'John Doe',
        image: 'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2020/10/02072937/Freelancer-start.png',
    },
    image: 'https://www.shutterstock.com/image-photo/businessman-pressing-button-on-touch-260nw-350999087.jpg',
    name: 'Sample Service',
    rating: 4.5,
    price: 89.99
}

class Home extends Component {
    render() {
        return (
            <div>
                <Categories />
                <ServiceCard service={service}  />
            </div>
        );
    }
}

export default Home;