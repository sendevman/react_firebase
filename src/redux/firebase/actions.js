import { createAction } from 'redux-actions';
import {
	GET_FB_USERS,
	GET_FB_LOCATIONS,
	GET_FB_PRODUCTS,
	GET_FB_AERAS,
	GET_FB_VOD,
	GET_CURRENT_USER,
	SET_STORE_USERS,
	SET_STORE_LOCATIONS,
	SET_STORE_PRODUCTS,
	SET_STORE_AERAS,
	SET_STORE_VOD,
	SET_CURRENT_USER,
	SET_USER_ERROR,
	FB_AUTH_LOGIN,
	FB_AUTH_LOGOUT,
	FB_TMP_UPLOAD_IMAGE,
	FB_TMP_DELETE_IMAGE,
	FB_UPLOAD_IMAGE,
	ADD_FB_LOCATIONS,
	ADD_FB_USERSTOLOCATIONS,
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

export const authLogin = createAction(
	FB_AUTH_LOGIN,
	(auth) => ({ auth }),
);

export const authLogout = createAction(
	FB_AUTH_LOGOUT,
);

export const getCurrentUser = createAction(
	GET_CURRENT_USER,
	(userId) => ({ userId }),
);

export const setCurrentUser = createAction(
	SET_CURRENT_USER,
	(currentUser) => ({ currentUser }),
);

export const setUserError = createAction(
	SET_USER_ERROR,
	(userError) => ({ userError }),
);

export const uploadTmpImage = createAction(
	FB_TMP_UPLOAD_IMAGE,
	(file) => ({ file }),
);

export const deleteTmpImage = createAction(
	FB_TMP_DELETE_IMAGE,
	(file) => ({ file }),
);

export const uploadImage = createAction(
	FB_UPLOAD_IMAGE,
	(file) => ({ file }),
);

export const addLocations = createAction(
	ADD_FB_LOCATIONS,
	(locations) => ({ locations }),
);

export const addUsersToLocations = createAction(
	ADD_FB_USERSTOLOCATIONS,
	(users) => ({ users }),
);
