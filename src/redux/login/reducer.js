import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

// import {} from './constants';

const initialState = fromJS({});

export default handleActions({}, initialState);
