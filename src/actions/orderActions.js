import axios from "axios";
import * as actions from '../constants/orderConstants'

const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_CREATE_REQUEST, payload: order });
        const { userLogin: { userInfo } } = getState();
        const { data: { data: newOrder } } = await axios.post("/api/orders", order, {
            headers: {
                Authorization: userInfo.token
            }
        });
        dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: newOrder });
    } catch (error) {
        dispatch({ type: actions.ORDER_CREATE_FAIL, payload: error.message });
    }
};

const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.MY_ORDER_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.get("/api/orders/mine", {
            headers:
                { Authorization: userInfo.token }
        });
        dispatch({ type: actions.MY_ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actions.MY_ORDER_LIST_FAIL, payload: error.message });
    }
};

const listOrders = () => async (dispatch, getState) => {

    try {
        dispatch({ type: actions.ORDER_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.get("/api/orders", {
            headers:
                { Authorization: userInfo.token }
        });
        dispatch({ type: actions.ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actions.ORDER_LIST_FAIL, payload: error.message });
    }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_DETAILS_REQUEST, payload: orderId });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.get("/api/orders/" + orderId, {
            headers:
                { Authorization: userInfo.token }
        });
        dispatch({ type: actions.ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actions.ORDER_DETAILS_FAIL, payload: error.message });
    }
};

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_PAY_REQUEST, payload: paymentResult });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
            headers:
                { Authorization: userInfo.token }
        });
        dispatch({ type: actions.ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actions.ORDER_PAY_FAIL, payload: error.message });
    }
};

const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: actions.ORDER_DELETE_REQUEST, payload: orderId });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/orders/" + orderId, {
            headers:
                { Authorization: userInfo.token }
        });
        dispatch({ type: actions.ORDER_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actions.ORDER_DELETE_FAIL, payload: error.message });
    }
};

export { createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deleteOrder };