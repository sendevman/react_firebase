import { combineReducers } from 'redux-immutable';
import loginReducer from '../redux/login/reducer';

export default function createReducer() {
  return combineReducers({
    login: loginReducer,
  });
}
