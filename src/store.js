import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import {productDetailsReducer, productListReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";
import {userLoginReducer, userSignupReducer} from "./reducers/userReducer";
import thunk from "redux-thunk";

const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;