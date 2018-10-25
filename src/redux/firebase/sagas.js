import { call, put, takeLatest } from 'redux-saga/effects';

import {
	GET_FB_USERS,
	GET_FB_LOCATIONS,
	GET_FB_PRODUCTS,
	GET_FB_AERAS,
  GET_FB_VOD,
	GET_CURRENT_USER,
  FB_AUTH_LOGIN,
  FB_AUTH_LOGOUT,
	FB_TMP_UPLOAD_IMAGE,
	FB_TMP_DELETE_IMAGE,
	FB_UPLOAD_IMAGE,
} from './constants';

import {
  getData,
  getToken,
  getCurrentUser,
  authLogin,
  authLogout,
  uploadImage,
  deleteTmpImage,
} from './api';

import {
  setUsers,
  setLocations,
  setProducts,
  setAreas,
  setVod,
  setCurrentUser,
  setUserError,
} from './actions';

function* asyncGetUsers() {
  const users = yield call(getData, 'users');
  yield put(setUsers(users));
}

function* asyncGetLocations() {
  const users = yield call(getData, 'locations');
  yield put(setLocations(users));
}

function* asyncGetProducts() {
  const products = yield call(getData, 'products');
  yield put(setProducts(products));
}

function* asyncGetAreas() {
  const areas = yield call(getData, 'areas');
  yield put(setAreas(areas));
}

function* asyncGetVod() {
  const vod = yield call(getData, 'vod');
  yield put(setVod(vod));
}

function* asyncAuthLogin(param) {
  const authUser = yield call(authLogin, param.payload.auth);
  if (authUser.state === 'success') {
    yield call(getToken, authUser.user);
    yield put(setCurrentUser(authUser.user));
  } else {
    yield put(setUserError(authUser.error));
  }
}

function* asyncAuthLogout() {
  yield call(authLogout);
}

function* asyncGetCurrentUser(param) {
  const currentuser = yield call(getCurrentUser, param.payload.auth);
  yield call(setCurrentUser, currentuser);
}

function* asyncUploadTmpImage(param) {
  yield call(uploadImage, 'tmp/landing/', param.payload.file);
}

function* asyncDeleteTmpImage(param) {
  yield call(deleteTmpImage, param.payload.file);
}

function* asyncUploadImage(param) {
  yield call(uploadImage, 'landing/', param.payload.file);
}

export function* sagaWatcher() {
  yield takeLatest(GET_FB_USERS, asyncGetUsers);
  yield takeLatest(GET_FB_LOCATIONS, asyncGetLocations);
  yield takeLatest(GET_FB_PRODUCTS, asyncGetProducts);
  yield takeLatest(GET_FB_AERAS, asyncGetAreas);
  yield takeLatest(GET_FB_VOD, asyncGetVod);
  yield takeLatest(FB_AUTH_LOGIN, asyncAuthLogin);
  yield takeLatest(FB_AUTH_LOGOUT, asyncAuthLogout);
  yield takeLatest(GET_CURRENT_USER, asyncGetCurrentUser);
  yield takeLatest(FB_TMP_UPLOAD_IMAGE, asyncUploadTmpImage);
  yield takeLatest(FB_TMP_DELETE_IMAGE, asyncDeleteTmpImage);
  yield takeLatest(FB_UPLOAD_IMAGE, asyncUploadImage);
}

export default [
  sagaWatcher(),
];
