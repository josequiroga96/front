import React, {Component} from 'react';

import './styles/homeScreen.css'
import data from '../data';
import {Link} from 'react-router-dom';

class HomeScreen extends Component {
    render() {
        return (
            <div>
                <ul className="products">
                    {
                        data !== undefined && data.products.map((product, key) => (
                            <li key={key}>
                                <div className="product">
                                    <Link to={'/products/' + product.id}>
                                        <img className="product-image" src={product.image} alt="product"/>
                                    </Link>
                                    <div className="product-name">
                                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                                    </div>
                                    <div className="product-brand">{product.brand}</div>
                                    <div className="product-price">${product.price}</div>
                                    <div className="product-rating">{product.rating} Stars ({product.reviews} Reviews)</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default HomeScreen;