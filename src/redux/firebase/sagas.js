import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_FB_USERS,
  GET_FB_LOCATIONS,
  GET_FB_PRODUCTS,
  GET_FB_AERAS,
  GET_FB_VOD,
  GET_CURRENT_USER,
  GET_FB_SUB_COLLECTION,
  ADD_FB_SUB_COLLECTION_FIELD,
  FB_AUTH_LOGIN,
  FB_AUTH_LOGOUT,
  FB_TMP_UPLOAD_IMAGE,
  FB_TMP_DELETE_IMAGE,
  FB_UPLOAD_IMAGE,
  ADD_FB_LOCATIONS,
  UPDATE_FB_DOC,
} from './constants';

import {
  getData,
  getToken,
  getCurrentUser,
  authLogin,
  authLogout,
  uploadImage,
  deleteTmpImage,
  getAddDataId,
  getSubCollection,
  addSubCollectionfield,
  addCollection,
  updateDoc,
} from './api';

import {
  setUsers,
  setLocations,
  setProducts,
  setAreas,
  setVod,
  setCurrentUser,
  setUserError,
  setSubCollection,
  setTempDownloadURL,
} from './actions';

function* asyncUpdateDoc(param) {
  const { field, id, data } = param.payload;
  yield call(updateDoc, field, id, data);
}

function* asyncAddLocations(param) {
  const id = yield call(getAddDataId, 'locations', param.payload.locations);
  const requests = param.payload.users.map(user =>
    call(addCollection, 'locations', id, 'users', user),
  );
  yield all(requests);
}

function* asyncGetSubCollection(param) {
  const { parent, id, child } = param.payload;
  const res = yield call(getSubCollection, parent, id, child);
  yield put(setSubCollection(parent, id, child, res));
}

function* asyncAddSubCollectionField(param) {
  const { parent, id, child, childId, data } = param.payload;
  yield call(addSubCollectionfield, parent, id, child, childId, data);
}

function* asyncGetUsers() {
  const users = yield call(getData, 'users');
  yield put(setUsers(users));
}

function* asyncGetLocations() {
  const locations = yield call(getData, 'locations');
  yield put(setLocations(locations));
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
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
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
  const downloadURL = yield call(uploadImage, param.payload.path, param.payload.file);
  yield put(setTempDownloadURL(downloadURL));
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
  yield takeLatest(ADD_FB_LOCATIONS, asyncAddLocations);
  yield takeLatest(UPDATE_FB_DOC, asyncUpdateDoc);
  yield takeLatest(GET_FB_SUB_COLLECTION, asyncGetSubCollection);
  yield takeLatest(ADD_FB_SUB_COLLECTION_FIELD, asyncAddSubCollectionField);
}

export default [
  sagaWatcher(),
];
