import axios from 'axios';
import Cookie from "js-cookie";
import * as actions from "../constants/cartConstants";

const addToCart = (productId, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/api/products/" + productId);
        dispatch({
            type: actions.CART_ADD_ITEM, payload: {
                product: data.id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                quantity: quantity
            }
        });
        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch (error) {

    }
};

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: actions.CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {
    dispatch({ type: actions.CART_SAVE_SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
    dispatch({ type: actions.CART_SAVE_PAYMENT, payload: data });
};

export { addToCart, removeFromCart, saveShipping, savePayment };