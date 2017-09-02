import { combineReducers } from 'redux';
import authentication from './authentication';
import Student from './Student'

const appReducer = combineReducers({
  authentication,
  Student
});

const rootReducer = (state, action) => {  
  if (action.type === 'LOG_OUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
