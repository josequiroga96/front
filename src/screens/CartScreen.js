import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../actions/cartActions";
import {Link} from "react-router-dom";
import "./styles/cartScreen.css"

function CartScreen(props) {
    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems, loading , error } = cart;

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const checkoutHandler = () => {
        console.log("Comprar")
    };

    useEffect(() => {
        if (productId) dispatch(addToCart(productId, quantity));

        return () => {}
    }, [productId, dispatch, quantity]);

    return loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>
                            Shopping Cart
                        </h3>
                        <div>
                            Price
                        </div>
                    </li>
                    { cartItems.length === 0 ? <div>Cart is empty</div> :
                        cartItems.map((item, index) => {
                            console.log(item);
                            return <li key={index}>
                                <div className="cart-image">
                                    <img src={"/" + item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/products/" + item.product}>
                                            {item.name}
                                        </Link>

                                    </div>
                                    <div className="cart-quantity">
                                        Qty: {item.quantity}
                                        <button type="button" className="btn-delete" onClick={() => removeFromCartHandler(item.product)} >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </li>
                        })
                    }
                </ul>

            </div>
            <div className="cart-action">
                <h3>
                    Subtotal ( {cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                    :
                    $ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h3>
                <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                    Proceed to Checkout
                </button>

            </div>

        </div>
    );
}

export default CartScreen;