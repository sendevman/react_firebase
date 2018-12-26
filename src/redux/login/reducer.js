/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

// import {} from './constants';

const initialState = fromJS({});

export default handleActions({}, initialState);
