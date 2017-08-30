import { combineReducers } from 'redux';
import authentication from './authentication';
import Student from './Student'

const appReducer = combineReducers({
  authentication,
  Student
});

export default appReducer;
