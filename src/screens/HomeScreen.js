import React, {useEffect} from 'react';

import './styles/homeScreen.css'
import {Link} from 'react-router-dom';
import StarRatings from "../components/Star";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";

function HomeScreen(props) {

    const productList = useSelector(state => state.productList);
    const { products, loading , error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());

        return () => {};
    }, [dispatch]);

    return loading ? <div>Loading...</div> :
        error ? <div>{error}</div> : (
        <div>
            <ul className="products">
                {
                    products.map((product, key) => (
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
                                <div className="product-rating">
                                    <StarRatings rating={product.rating}/>
                                    <div>({product.reviews} Reviews)</div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default HomeScreen;