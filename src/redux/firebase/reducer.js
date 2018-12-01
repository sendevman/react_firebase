import { fromJS, List, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import _ from 'lodash';

import {
	SET_STORE_USERS,
	SET_STORE_LOCATIONS,
	SET_STORE_PRODUCTS,
	SET_STORE_AERAS,
	SET_STORE_VOD,
	SET_SUB_COLLECTION,
	SET_CURRENT_USER,
	SET_USER_ERROR,
	SET_DOWNLOAD_URL,
} from './constants';

const initialState = fromJS({
	users: [],
	locations: [],
	products: [],
	areas: [],
	vod: [],
	currentUser: {},
	userError: {},
	downloadURL: '',
});

export default handleActions({
	[SET_STORE_USERS]: (state, action) => state.update('users', () => List(action.payload.users.map(item => item))),
	[SET_STORE_LOCATIONS]: (state, action) => state.update('locations', () => List(action.payload.locations.map(item => item))),
	[SET_STORE_PRODUCTS]: (state, action) => state.update('products', () => List(action.payload.products.map(item => item))),
	[SET_STORE_AERAS]: (state, action) => state.update('areas', () => List(action.payload.areas.map(item => item))),
	[SET_STORE_VOD]: (state, action) => state.update('vod', () => List(action.payload.vod.map(item => item))),
	[SET_SUB_COLLECTION]: (state, { payload: { parent, id, child, subCollection } }) =>
		state
			.updateIn([parent, _.findIndex(state.get(parent).toJS(), item => item.fbId === id)], data => {
				data.subCollection = {};
				data.subCollection[child] = subCollection;
				return Map(data);
			}),
	[SET_CURRENT_USER]: (state, action) =>
		state
			.set('currentUser', { ...action.payload.currentUser, res: 'User' })
			.set('userError', { res: 'noError' }),
	[SET_USER_ERROR]: (state, action) =>
		state
			.set('currentUser', { res: 'noUser' })
			.set('userError', { ...action.payload, res: 'Error' }),
	[SET_DOWNLOAD_URL]: (state, action) => state.set('downloadURL', action.payload.downloadURL),

}, initialState);
