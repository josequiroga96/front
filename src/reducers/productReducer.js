import * as actions from "../constants/productConstants";

function productListReducer(state = { products: [] }, action) {

    switch (action.type) {
        case actions.PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case actions.PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case actions.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function productDetailsReducer(state = { product: {} }, action) {

    switch (action.type) {
        case actions.PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case actions.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case actions.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function productDeleteReducer(state = { product: {} }, action) {

    switch (action.type) {
        case actions.PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case actions.PRODUCT_DELETE_SUCCESS:
            return { loading: false, product: action.payload, success: true };
        case actions.PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function productSaveReducer(state = { product: {} }, action) {

    switch (action.type) {
        case actions.PRODUCT_SAVE_REQUEST:
            return { loading: true };
        case actions.PRODUCT_SAVE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case actions.PRODUCT_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { productListReducer, productDetailsReducer, productDeleteReducer, productSaveReducer };