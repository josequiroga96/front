import React, {useEffect, useState} from 'react';

import './styles/productScreen.css';
import { Link } from 'react-router-dom';
import StarRatings from "../components/Star";
import {useDispatch, useSelector} from "react-redux";
import {detailsProduct} from "../actions/productActions";

function ProductScreen(props) {

    const id = props.match.params.id;
    const [quantity, setQuantity] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading , error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(id));

        return () => {};
    }, [dispatch, id]);

    const handleAddToCart = () => {
        props.history.push('/cart/' + id + '?qty=' + quantity);
    };

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">
                    &#60; Back to result
                </Link>
            </div>
            {loading ? <div>Loading...</div> : error ? <div>{error}</div> :
                <div className="details">
                    <div className="details-image">
                        <img src={"/" + product.image} alt="product"/>
                    </div>
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                <StarRatings rating={product.rating}/>
                                <div>({product.reviews} Customer reviews)</div>
                            </li>
                            <li>
                                Price: <b>${product.price}</b>
                            </li>
                            <li>
                                Description:
                                <div>
                                    {product.description}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Price: {product.price * quantity}
                            </li>
                            <li>
                                Status: {product.stock > 0 ? "In Stock" : "Unavailable."}
                            </li>
                            <li>
                                Qty:
                                <select
                                    value={quantity}
                                    onChange={(event) => {setQuantity(event.target.value)}}
                                    disabled={1 > product.stock}
                                >
                                    {[...Array(product.stock).keys()].map(index =>
                                        <option key={index} value={index + 1}>{index + 1}</option>
                                    )}
                                </select>
                            </li>
                            <li>
                                {product.stock > 0 ?
                                    <button onClick={() => handleAddToCart()}
                                            className="button primary">
                                        Add to Cart
                                    </button>
                                    :
                                    <div>Out of stock.</div>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductScreen;