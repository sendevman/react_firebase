import { call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_FB_USERS,
  GET_FB_LOCATIONS,
  GET_FB_PRODUCTS,
  GET_FB_CARD_TYPES,
  GET_FB_AERAS,
  GET_FB_VOD,
  GET_CURRENT_USER,
  GET_FB_SUB_COLLECTION,
  ADD_FB_SUB_COLLECTION_FIELD,
  FB_AUTH_LOGIN,
  FB_AUTH_LOGOUT,
  FB_TMP_UPLOAD_IMAGE,
  FB_TMP_DELETE_IMAGE,
  ADD_FB_COLLECTION_DATA,
  ADD_FB_DOC_FIELD,
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
  addDocField,
  updateDoc,
} from './api';

import {
  setUsers,
  setLocations,
  setProducts,
  setCardTypes,
  setAreas,
  setVod,
  setCurrentUser,
  setUserError,
  setSubCollection,
} from './actions';

function* asyncUpdateDoc(param) {
  const { field, id, data } = param.payload;
  yield call(updateDoc, field, id, data);
}

function* asyncAddCollectionData(param) {
  const { collection, location } = param.payload;
  yield call(getAddDataId, collection, location);
  // const requests = param.payload.users.map(user =>
  //   call(addCollection, collection, id, 'users', user),
  // );
  // yield all(requests);
}

function* asyncGetSubCollection(param) {
  const { parent, id, child } = param.payload;
  const res = yield call(getSubCollection, parent, id, child);
  yield put(setSubCollection(parent, id, child, res));
}

function* asyncAddSubCollectionField(param) {
  const { parent, id, child, childId, field, data } = param.payload;
  const res = {};
  res[field] = data.data;
  if (data.uploadImg && data.uploadImg.imgBackSrcType) {
    res[field].bgImg = yield call(uploadImage, `${child}/`, { name: `${field}-bg-${childId}-${data.uploadImg.imgBackSrcType.name}`, data: data.uploadImg.imgBackSrcType });
  }
  if (data.uploadImg && data.uploadImg.imgCardSrcType) {
    res[field].img = yield call(uploadImage, `${child}/`, { name: `${field}-${childId}-${data.uploadImg.imgCardSrcType.name}`, data: data.uploadImg.imgCardSrcType });
  }
  yield call(addSubCollectionfield, parent, id, child, childId, res);
}

function* asyncAddDocField(param) {
  const { field, id, data } = param.payload;
  yield call(addDocField, field, id, data);
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

function* asyncGetCardTypes() {
  const cardTypes = yield call(getData, 'cardTypes');
  yield put(setCardTypes(cardTypes));
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
    localStorage.setItem('email', param.payload.auth.email);
  } else {
    yield put(setUserError(authUser.error));
  }
}

function* asyncAuthLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
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
  yield takeLatest(ADD_FB_COLLECTION_DATA, asyncAddCollectionData);
  yield takeLatest(UPDATE_FB_DOC, asyncUpdateDoc);
  yield takeLatest(GET_FB_SUB_COLLECTION, asyncGetSubCollection);
  yield takeLatest(ADD_FB_SUB_COLLECTION_FIELD, asyncAddSubCollectionField);
  yield takeLatest(ADD_FB_DOC_FIELD, asyncAddDocField);
  yield takeLatest(GET_FB_CARD_TYPES, asyncGetCardTypes);
}

export default [
  sagaWatcher(),
];
