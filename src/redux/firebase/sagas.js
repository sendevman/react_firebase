/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

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
  ADD_FB_DOC_SUB_IMAGE_FIELD,
  ADD_FB_DOC_IMAGE_FIELD,
  ADD_FB_DOC,
  UPLOAD_IMAGE,
  UPDATE_FB_DOC_NEW,
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
  addDoc,
  updateDocNew,
  updateDoc,
} from './api';

import {
  setNewDocId,
  setNewDocError,
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
    res[field].bgImg = yield call(uploadImage, `${parent}/${id}/${child}/${childId}/${field}/`, { name: `bg-${data.uploadImg.imgBackSrcType.name}`, data: data.uploadImg.imgBackSrcType });
  }
  if (data.uploadImg && data.uploadImg.imgCardSrcType) {
    res[field].img = yield call(uploadImage, `${parent}/${id}/${child}/${childId}/${field}/`, { name: `${data.uploadImg.imgCardSrcType.name}`, data: data.uploadImg.imgCardSrcType });
  }
  yield call(addSubCollectionfield, parent, id, child, childId, res);
  const resData = yield call(getSubCollection, parent, id, child);
  yield put(setSubCollection(parent, id, child, resData));
}

function* asyncAddDocField(param) {
  const { field, id, data } = param.payload;
  yield call(addDocField, field, id, data);
}

function* asyncAddDocImageField(param) {
  const { parent, id, field, index, data, imgItem, img } = param.payload;
  let res = {};
  if (field !== '') {
    res[field] = data;
  } else {
    res = data;
  }
  if (img) {
    if (index) {
      res[field][index][imgItem] = yield call(uploadImage, `${parent}/${id}/${field}/`, { name: `directv_section${index + 1}`, data: img });
    } else if (field !== '') {
      res[field][imgItem] = yield call(uploadImage, `${parent}/${id}/${field}/`, { name: `directv_section${index + 1}`, data: img });
    } else {
      res[imgItem] = yield call(uploadImage, `${parent}/${id}/${field}/`, { name: `directv_section${index + 1}`, data: img });
    }
  }
  yield call(addDocField, parent, id, res);
  const products = yield call(getData, 'products');
  yield put(setProducts(products));
}

function* asyncAddDocSubImageField(param) {
  const { parent, id, field, index, subField, subIndex, data, img } = param.payload;
  const res = {};
  res[field] = data;
  if (img) {
    res[field][index][subField][subIndex].img = yield call(uploadImage, `${parent}/${id}/${field}/${subField}/`, { name: `directv_section${index + 1}`, data: img });
  }
  yield call(addDocField, parent, id, res);
  const products = yield call(getData, 'products');
  yield put(setProducts(products));
}

function* asyncAddDoc(param) {
  const { collection, data } = param.payload;
  const addDocRes = yield call(addDoc, collection, data);
  if (addDocRes.state === 'success') {
    yield call(updateDocNew, collection, addDocRes.docId, { fbId: addDocRes.docId });
    const products = yield call(getData, 'products');
    yield put(setProducts(products));
    yield put(setNewDocId(addDocRes.docId));
  } else {
    yield put(setNewDocError(addDocRes.error));
  }
}

function* asyncUpdateDocNew(param) {
  const { collection, id, data } = param.payload;
  yield call(updateDocNew, collection, id, data);
  const products = yield call(getData, 'products');
  yield put(setProducts(products));
  yield put(setNewDocId(id));
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

function* asyncUploadImage(param) {
  const { path, file, data } = param.payload;
  const downloadUrl = yield call(uploadImage, path, file);

  if (downloadUrl) {
    let collection = path.split('/')[0];
    let docId = path.split('/')[1];
    data[path.split('/')[2]].img = downloadUrl;
    yield call(updateDocNew, collection, docId, data);
    const products = yield call(getData, 'products');
    yield put(setProducts(products));
    yield put(setNewDocId(docId));
  }
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
  yield takeLatest(ADD_FB_DOC_SUB_IMAGE_FIELD, asyncAddDocSubImageField);
  yield takeLatest(ADD_FB_DOC_IMAGE_FIELD, asyncAddDocImageField);
  yield takeLatest(ADD_FB_DOC, asyncAddDoc);
  yield takeLatest(UPLOAD_IMAGE, asyncUploadImage);
  yield takeLatest(UPDATE_FB_DOC_NEW, asyncUpdateDocNew);
  yield takeLatest(GET_FB_CARD_TYPES, asyncGetCardTypes);
}

export default [
  sagaWatcher(),
];
