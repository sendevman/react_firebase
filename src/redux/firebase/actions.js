import { createAction } from 'redux-actions';
import {
	GET_FB_USERS,
	GET_FB_LOCATIONS,
	GET_FB_PRODUCTS,
	GET_FB_AERAS,
	GET_FB_VOD,
	SET_STORE_USERS,
	SET_STORE_LOCATIONS,
	SET_STORE_PRODUCTS,
	SET_STORE_AERAS,
	SET_STORE_VOD,
} from './constants';

export const getUsers = createAction(
	GET_FB_USERS,
);

export const getLocations = createAction(
	GET_FB_LOCATIONS,
);

export const getProducts = createAction(
	GET_FB_PRODUCTS,
);

export const getAreas = createAction(
	GET_FB_AERAS,
);

export const getVod = createAction(
	GET_FB_VOD,
);

export const setUsers = createAction(
	SET_STORE_USERS,
	(users) => ({ users }),
);

export const setLocations = createAction(
	SET_STORE_LOCATIONS,
	(locations) => ({ locations }),
);

export const setProducts = createAction(
	SET_STORE_PRODUCTS,
	(products) => ({ products }),
);

export const setAreas = createAction(
	SET_STORE_AERAS,
	(areas) => ({ areas }),
);

export const setVod = createAction(
	SET_STORE_VOD,
	(vod) => ({ vod }),
);
