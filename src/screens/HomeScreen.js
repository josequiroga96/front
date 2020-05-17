import React, {useEffect, useState} from 'react';

import './styles/homeScreen.css'
import {Link} from 'react-router-dom';
import StarRatings from "../components/Star";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";

function HomeScreen(props) {

    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';

    const productList = useSelector(state => state.productList);
    const { products, loading , error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts(category));

        return () => {};
    }, [dispatch, category]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(category, searchKeyword, sortOrder))
    };
    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        dispatch(listProducts(category, searchKeyword, e.target.value))
    };

    return <>
        {category &&
        <h2>{category}</h2>}

        <ul className="filter">
            <li>
                <form onSubmit={submitHandler}>
                    <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
                    <button type="submit">Search</button>
                </form>
            </li>
            <li>
                Sort By {' '}
                <select name="sortOrder" onChange={sortHandler}>
                    <option value="" defaultValue>Newest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </li>
        </ul>
        {loading ? <div>Loading...</div> :
            error ? <div>{error}</div> : (
                <div>
                    <ul className="products">
                        {
                            products.map((product, key) => (
                                <li key={key}>
                                    <div className="product">
                                        <Link to={'/products/' + product.id}>
                                            <img className="product-image" src={"/" + product.image} alt="product"/>
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
            )
        }
    </>
}

export default HomeScreen;