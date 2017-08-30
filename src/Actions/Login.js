import initialState from '../Reducers/userState';
export const login = (username, password) => async (dispatch, getState) => {
    try {
        if (username === initialState.user.email && password === initialState.user.password) {
            dispatch({ type: 'LOGIN_SUCCESS', response: true });
        } else {
            dispatch({ type: 'LOGIN_FAIL', response: false });
        }
    } catch (error) {
        throw error;
    }
};