import React, { Component } from 'react';
import Categories from '../components/categories/Categories';

class Home extends Component {
    render() {
        return (

            <div>
                <Categories />
                <h1>Home</h1>
            </div>
        );
    }
}

export default Home;