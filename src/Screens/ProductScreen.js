import React from 'react';

import './styles/productScreen.css';
import { useParams, Link } from 'react-router-dom';
import data from "../data";
import StarRatings from "../Components/Star";

function ProductScreen(props) {
    const { id } = useParams();
    const product = data.products.find(product => product.id === id);
    console.log(product);

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
            </div>
        </div>
    );
}

export default ProductScreen;