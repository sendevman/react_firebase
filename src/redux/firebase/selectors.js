import { createSelector } from 'reselect';

const firebaseSelector = state => state.get('firebase');
const usersSelector = createSelector([firebaseSelector], firebase => firebase.get('users').toJS());
const locationsSelector = createSelector([firebaseSelector], firebase => firebase.get('locations').toJS());
const productsSelector = createSelector([firebaseSelector], firebase => firebase.get('products').toJS());
const areasSelector = createSelector([firebaseSelector], firebase => firebase.get('areas').toJS());
const vodSelector = createSelector([firebaseSelector], firebase => firebase.get('vod').toJS());
const currentUserSelector = createSelector([firebaseSelector], firebase => firebase.get('currentUser'));
const userErrorSelector = createSelector([firebaseSelector], firebase => firebase.get('userError'));

export {
  firebaseSelector,
  usersSelector,
  locationsSelector,
  productsSelector,
  areasSelector,
  vodSelector,
  currentUserSelector,
  userErrorSelector,
};