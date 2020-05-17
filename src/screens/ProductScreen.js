import React from 'react';

import './styles/productScreen.css';
import { useParams, Link } from 'react-router-dom';
import data from "../data";
import StarRatings from "../components/Star";

function ProductScreen(props) {
    const { id } = useParams();
    const product = data.products.find(product => product.id === id);

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">
                    &#60; Back to result
                </Link>
            </div>
            <div className="details">
                <div className="details-image">
                    <img src={"/" + product.image} alt="product" />
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
                            Price: {product.price}
                        </li>
                        <li>
                            Status: {product.stock > 0 ? "In Stock" : "Unavailable."}
                        </li>
                        <li>
                            Qty:
                            <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </li>
                        <li>
                            {product.stock > 0 &&
                            <button onClick={() => console.log("agregar al carrito")} className="button primary" >
                                Add to Cart
                            </button>}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductScreen;