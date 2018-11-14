import { createAction } from 'redux-actions';
import {
	GET_FB_USERS,
	GET_FB_LOCATIONS,
	GET_FB_PRODUCTS,
	GET_FB_AERAS,
	GET_FB_VOD,
	GET_CURRENT_USER,
	GET_FB_SUB_COLLECTION,
	SET_STORE_USERS,
	SET_STORE_LOCATIONS,
	SET_STORE_PRODUCTS,
	SET_STORE_AERAS,
	SET_STORE_VOD,
	SET_SUB_COLLECTION,
	SET_CURRENT_USER,
	SET_USER_ERROR,
	FB_AUTH_LOGIN,
	FB_AUTH_LOGOUT,
	FB_TMP_UPLOAD_IMAGE,
	FB_TMP_DELETE_IMAGE,
	FB_UPLOAD_IMAGE,
	ADD_FB_LOCATIONS,
	UPDATE_FB_DOC,
} from './constants';

export const updateDoc = createAction(
	UPDATE_FB_DOC,
	(field, id, data) => ({ field, id, data }),
);

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

export const getSubCollection = createAction(
	GET_FB_SUB_COLLECTION,
	(parent, id, child) => ({ parent, id, child }),
);

/* add data */
export const addLocations = createAction(
	ADD_FB_LOCATIONS,
	(locations, users) => ({ locations, users }),
);

/* set all data */
export const setSubCollection = createAction(
	SET_SUB_COLLECTION,
	(parent, id, child, subCollection) => ({ parent, id, child, subCollection }),
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

/* user */
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

/* image */
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

/* auth */
export const authLogin = createAction(
	FB_AUTH_LOGIN,
	(auth) => ({ auth }),
);

export const authLogout = createAction(
	FB_AUTH_LOGOUT,
);
