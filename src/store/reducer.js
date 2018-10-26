import { combineReducers } from 'redux-immutable';
import firebaseReducer from '../redux/firebase/reducer';

export default function createReducer() {
  return combineReducers({
    firebase: firebaseReducer,
  });
}
