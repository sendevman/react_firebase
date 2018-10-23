import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';

import {
	SET_STORE_USERS,
	SET_STORE_LOCATIONS,
	SET_STORE_PRODUCTS,
	SET_STORE_AERAS,
	SET_STORE_VOD,
} from './constants';

const initialState = fromJS({
	users: [],
	locations: [],
	products: [],
	areas: [],
	vod: [],
});

export default handleActions({
	[SET_STORE_USERS]: (state, action) => state.update('users', () => List(action.payload.users.map(item => item))),
	[SET_STORE_LOCATIONS]: (state, action) => state.update('locations', () => List(action.payload.locations.map(item => item))),
	[SET_STORE_PRODUCTS]: (state, action) => state.update('products', () => List(action.payload.products.map(item => item))),
	[SET_STORE_AERAS]: (state, action) => state.update('areas', () => List(action.payload.areas.map(item => item))),
	[SET_STORE_VOD]: (state, action) => state.update('vod', () => List(action.payload.vod.map(item => item))),
}, initialState);
