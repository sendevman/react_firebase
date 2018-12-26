/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import { combineReducers } from 'redux-immutable';
import firebaseReducer from '../redux/firebase/reducer';

export default function createReducer() {
  return combineReducers({
    firebase: firebaseReducer,
  });
}
