import axios from 'axios';
import Cookie from 'js-cookie';
import * as actions from '../constants/userConstants';

const login = (username, password) => async (dispatch) => {
    dispatch({ type: actions.USER_LOGIN_REQUEST, payload: { username, password } });
    try {
        const { headers } = await axios.post("/login", { username, password });
        const payload = {username: username, token: headers.authorization};
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: payload });
        Cookie.set('userInfo', JSON.stringify(payload));
    } catch (error) {
        dispatch({ type: actions.USER_LOGIN_FAIL, payload: error.message });
    }
};

const signup = (username, email, password) => async (dispatch) => {
    dispatch({ type: actions.USER_SIGNUP_REQUEST, payload: { email, username, password } });
    try {
        const { data } = await axios.post("/users/sign-up", { email: email, username: username, password: password });
        dispatch({ type: actions.USER_SIGNUP_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: actions.USER_SIGNUP_FAIL, payload: error.message });
    }
};

const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: actions.USER_LOGOUT })
};

export { login, signup, logout };