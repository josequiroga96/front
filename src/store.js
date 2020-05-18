import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import {
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productSaveReducer
} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";
import {userLoginReducer, userSignupReducer} from "./reducers/userReducer";
import thunk from "redux-thunk";
import {
    myOrderListReducer,
    orderCreateReducer, orderDeleteReducer,
    orderDetailsReducer,
    orderListReducer,
    orderPayReducer
} from "./reducers/orderReducer";

const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productSave: productSaveReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderPay: orderPayReducer,
    orderDelete: orderDeleteReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;