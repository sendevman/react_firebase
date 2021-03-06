/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import { createAction } from 'redux-actions';

import {
	GET_FB_USERS,
	GET_FB_LOCATIONS,
	GET_FB_PRODUCTS,
	GET_FB_CARD_TYPES,
	GET_FB_AERAS,
	GET_FB_VOD,
	GET_CURRENT_USER,
	GET_FB_SUB_COLLECTION,
	SET_STORE_USERS,
	SET_STORE_LOCATIONS,
	SET_STORE_PRODUCTS,
	SET_STORE_CARD_TYPES,
	SET_STORE_AERAS,
	SET_STORE_VOD,
	SET_SUB_COLLECTION,
	SET_CURRENT_USER,
	SET_USER_ERROR,
	SET_NEW_DOC_ID,
	SET_NEW_DOC_ERROR,
	FB_AUTH_LOGIN,
	FB_AUTH_LOGOUT,
	FB_TMP_UPLOAD_IMAGE,
	FB_TMP_DELETE_IMAGE,
	ADD_FB_COLLECTION_DATA,
	ADD_FB_DOC_FIELD,
	ADD_FB_DOC_SUB_IMAGE_FIELD,
	ADD_FB_DOC_IMAGE_FIELD,
	ADD_FB_SUB_COLLECTION_FIELD,
	ADD_FB_DOC,
	UPLOAD_IMAGE,
	UPDATE_FB_DOC_NEW,
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

export const getCardTypes = createAction(
	GET_FB_CARD_TYPES,
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
export const addDoc = createAction(
	ADD_FB_DOC,
	(collection, data) => ({ collection, data }),
);

export const updateDocNew = createAction(
	UPDATE_FB_DOC_NEW,
	(collection, id, data) => ({ collection, id, data }),
);

export const addCollectionData = createAction(
	ADD_FB_COLLECTION_DATA,
	(collection, location) => ({ collection, location }),
);

export const addSubCollectionField = createAction(
	ADD_FB_SUB_COLLECTION_FIELD,
	(parent, id, child, childId, field, data) => ({ parent, id, child, childId, field, data }),
);

export const addDocField = createAction(
	ADD_FB_DOC_FIELD,
	(field, id, data) => ({ field, id, data }),
);

export const addDocImageField = createAction(
	ADD_FB_DOC_IMAGE_FIELD,
	(parent, id, field, index, data, imgItem, img) => ({ parent, id, field, index, data, imgItem, img }),
);

export const addDocSubImageField = createAction(
	ADD_FB_DOC_SUB_IMAGE_FIELD,
	(parent, id, field, index, subField, subIndex, data, img) => ({ parent, id, field, index, subField, subIndex, data, img }),
);

export const uploadImage = createAction(
	UPLOAD_IMAGE,
	(path, file, data) => ({ path, file, data }),
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

export const setCardTypes = createAction(
	SET_STORE_CARD_TYPES,
	(cardTypes) => ({ cardTypes }),
);

export const setAreas = createAction(
	SET_STORE_AERAS,
	(areas) => ({ areas }),
);

export const setVod = createAction(
	SET_STORE_VOD,
	(vod) => ({ vod }),
);

export const setNewDocId = createAction(
	SET_NEW_DOC_ID,
	(newDocId) => ({ newDocId }),
);

export const setNewDocError = createAction(
	SET_NEW_DOC_ERROR,
	(newDocError) => ({ newDocError }),
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

/* auth */
export const authLogin = createAction(
	FB_AUTH_LOGIN,
	(auth) => ({ auth }),
);

export const authLogout = createAction(
	FB_AUTH_LOGOUT,
);
