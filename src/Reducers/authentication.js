import userState from './userState';
import data from '../Data/student.json'

const authReducer = (state = userState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isLogin: action.response,
        students: data
      });
    case 'LOGIN_FAIL':
      return Object.assign({}, state, {
        isLogin: action.response
      });
    default:
      return state;
  }
};
export default authReducer;
