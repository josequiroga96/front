import * as actions from "../constants/productConstants";
import axios from 'axios';

const listProducts = (category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {
    try {
        dispatch({ type: actions.PRODUCT_LIST_REQUEST });
        const response = await axios.get("/api/products/?category=" + category +
            "&searchKeyword=" + searchKeyword + "&sortOrder=" + sortOrder);
        const { data } = response;
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

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.PRODUCT_SAVE_REQUEST, payload: product });
        const { userLogin: { userInfo } } = getState();
        if (!product.id) {
            const { data } = await axios.post('/api/products/', product, {
                headers: {
                    'Authorization': userInfo.token
                }
            });
            dispatch({ type: actions.PRODUCT_SAVE_SUCCESS, payload: data });
        } else {
            const { data } = await axios.put('/api/products/' + product.id, product, {
                headers: {
                    'Authorization': userInfo.token
                }
            });
            dispatch({ type: actions.PRODUCT_SAVE_SUCCESS, payload: data });
        }

    } catch (error) {

        dispatch({ type: actions.PRODUCT_SAVE_FAIL, payload: error.message });
    }
};

const deleteProdcut = (productId) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState();
        dispatch({ type: actions.PRODUCT_DELETE_REQUEST, payload: productId });
        const { data } = await axios.delete("/api/products/" + productId, {
            headers: {
                Authorization: userInfo.token
            }
        });
        dispatch({ type: actions.PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
        dispatch({ type: actions.PRODUCT_DELETE_FAIL, payload: error.message });

    }
};

export { listProducts, detailsProduct, saveProduct, deleteProdcut };