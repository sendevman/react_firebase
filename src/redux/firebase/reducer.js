import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';
import _ from 'lodash';

import {
	SET_STORE_USERS,
	SET_STORE_LOCATIONS,
	SET_STORE_PRODUCTS,
	SET_STORE_CARD_TYPES,
	SET_STORE_AERAS,
	SET_STORE_VOD,
	SET_SUB_COLLECTION,
	SET_CURRENT_USER,
	SET_USER_ERROR,
	SET_ACCESS_USER_LIST,
} from './constants';

const initialState = fromJS({
	users: [],
	locations: [],
	products: [],
	cardTypes: [],
	areas: [],
	vod: [],
	currentUser: {},
	userError: {},
	downloadURL: '',
	accessUserList: [],
});

export default handleActions({
	[SET_STORE_USERS]: (state, action) => state.update('users', () => List(action.payload.users.map(item => item))),
	[SET_STORE_LOCATIONS]: (state, action) => state.update('locations', () => List(action.payload.locations.map(item => item))),
	[SET_STORE_PRODUCTS]: (state, action) => state.update('products', () => List(action.payload.products.map(item => item))),
	[SET_STORE_CARD_TYPES]: (state, action) => state.update('cardTypes', () => List(action.payload.cardTypes.map(item => item))),
	[SET_STORE_AERAS]: (state, action) => state.update('areas', () => List(action.payload.areas.map(item => item))),
	[SET_STORE_VOD]: (state, action) => state.update('vod', () => List(action.payload.vod.map(item => item))),
	[SET_SUB_COLLECTION]: (state, { payload: { parent, id, child, subCollection } }) =>
		state
			.updateIn([parent, _.findIndex(state.get(parent).toJS(), item => item.fbId === id)], data => {
				const res = Object.assign({}, data);
				if (!res.subCollection) {
					res.subCollection = {};
				}
				res.subCollection[child] = subCollection;
				return res;
			}),
	[SET_CURRENT_USER]: (state, action) =>
		state
			.set('currentUser', { ...action.payload.currentUser, res: 'User' })
			.set('userError', { res: 'noError' }),
	[SET_USER_ERROR]: (state, action) =>
		state
			.set('currentUser', { res: 'noUser' })
			.set('userError', { ...action.payload, res: 'Error' }),
	[SET_ACCESS_USER_LIST]: (state, action) => state.update('accessUserList', () => List(action.payload.accessUserList.map(item => item))),

}, initialState);
