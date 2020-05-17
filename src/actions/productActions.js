import * as actions from "../constants/productConstants";
import axios from 'axios';

const listProducts = (category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {
    try {
        dispatch({ type: actions.PRODUCT_LIST_REQUEST });
        const { data } = await axios.get("/api/products/?category=" + category +
            "&searchKeyword=" + searchKeyword + "&sortOrder=" + sortOrder);
        dispatch({ type: actions.PRODUCT_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: actions.PRODUCT_LIST_FAIL, payload: error.message });
    }
};

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: actions.PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get("/api/products/" + productId);
        dispatch({ type: actions.PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actions.PRODUCT_DETAILS_FAIL, payload: error.message });

    }
};

export { listProducts, detailsProduct }