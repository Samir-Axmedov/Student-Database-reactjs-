import initialState from '../Reducers/userState';
import { hashHistory } from 'react-router';
export const login = (username, password) => async (dispatch, getState) => {
    try {
        if (username === initialState.user.email && password === initialState.user.password) {
            dispatch({ type: 'LOGIN_SUCCESS', response: true });
        } else {
            dispatch({ type: 'LOGIN_FAIL', response: null });
        }
    } catch (error) {
        throw error;
    }
};

export function logOutUser() {
    localStorage.clear();
    return { type: 'LOG_OUT', response: false }
}