import * as actions from '../constants/userConstants';

function userLoginReducer(state = {}, action) {
    switch (action.type) {
        case actions.USER_LOGIN_REQUEST:
            return { loading: true };
        case actions.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case actions.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case actions.USER_LOGOUT:
            return {};
        default: return state;
    }
}

function userSignupReducer(state = {}, action) {
    switch (action.type) {
        case actions.USER_SIGNUP_REQUEST:
            return { loading: true };
        case actions.USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case actions.USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}
export { userLoginReducer, userSignupReducer };