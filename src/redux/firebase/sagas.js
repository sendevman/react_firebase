import { call, put, takeLatest } from 'redux-saga/effects';

import {
	GET_FB_USERS,
	GET_FB_LOCATIONS,
	GET_FB_PRODUCTS,
	GET_FB_AERAS,
	GET_FB_VOD,
} from './constants';

import { getData } from './api';

import {
  setUsers,
  setLocations,
  setProducts,
  setAreas,
  setVod,
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

export function* sagaWatcher() {
  yield takeLatest(GET_FB_USERS, asyncGetUsers);
  yield takeLatest(GET_FB_LOCATIONS, asyncGetLocations);
  yield takeLatest(GET_FB_PRODUCTS, asyncGetProducts);
  yield takeLatest(GET_FB_AERAS, asyncGetAreas);
  yield takeLatest(GET_FB_VOD, asyncGetVod);
}

export default [
  sagaWatcher(),
];
