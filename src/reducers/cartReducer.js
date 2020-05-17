import * as actions from "../constants/cartConstants";

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
    switch (action.type) {
        case actions.CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if (product) {
                return {
                    cartItems:
                        state.cartItems.map(x => x.product === product.product ? item : x)
                };
            }
            return { cartItems: [...state.cartItems, item] };
        case actions.CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.product !== action.payload) };
        case actions.CART_SAVE_SHIPPING:
            return { ...state, shipping: action.payload };
        case actions.CART_SAVE_PAYMENT:
            return { ...state, payment: action.payload };
        default:
            return state
    }
}

export { cartReducer };