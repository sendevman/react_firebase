/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import { auth, firestore, storage } from './config';

/* all data */
export const getData = (data) =>
	firestore
		.collection(data)
		.get()
		.then(res => {
			const response = [];
			res.forEach(item => {
				response.push({ ...item.data(), fbId: item.id });
			});
			return response;
		});

export const getAddDataId = (field, data) =>
	firestore
		.collection(field)
		.add(data)
		.then(res => res.id);

export const addCollection = (field, id, childCollection, user) =>
	firestore
		.collection(field)
		.doc(id)
		.collection(childCollection)
		.add(user)
		.then(res => res);

export const getSubCollection = (parent, id, child) =>
	firestore
		.collection(parent)
		.doc(id)
		.collection(child)
		.get()
		.then(res => {
			const response = [];
			res.forEach(item => {
				response.push({ ...item.data(), fbId: item.id });
			});
			return response;
		});

export const addSubCollectionfield = (parent, id, child, childId, data) =>
	firestore
		.collection(parent)
		.doc(id)
		.collection(child)
		.doc(childId)
		.update(data)
		.then(res => res);

export const addDocField = (field, id, data) =>
	firestore
		.collection(field)
		.doc(id)
		.update(data)
		.then(res => res);

export const addDoc = (collection, data) =>
	firestore
		.collection(collection)
		.add(data)
		.then(res => ({ state: 'success', docId: res.id }))
		.catch(error => ({ state: 'error', error }));

export const updateDocNew = (collection, id, data) =>
	firestore
		.collection(collection)
		.doc(id)
		.update(data)
		.then(res => res);

export const updateDoc = (field, id, data) =>
	firestore
		.collection(field)
		.doc(id)
		.set(data)
		.then(res => res);

export const getCurrentUser = (userId) =>
	firestore
		.collection('users')
		.doc(userId)
		.get()
		.then(user => user);

/* image */
export const deleteTmpImage = (file) =>
	storage
		.ref()
		.child(file.metadata.fullPath)
		.delete()
		.then(res => res);

export const uploadImage = (path, file) =>
	storage
		.ref()
		.child(path)
		.child(file.name)
		.put(file.data)
		.then(res => res.ref.getDownloadURL())
		.then(downloadURL => downloadURL);

export const getToken = (authUser) =>
	authUser.user
		.getIdToken()
		.then(token => {
			if (localStorage.getItem('token') === null) {
				localStorage.setItem('token', token);
				localStorage.setItem('refreshToken', authUser.user.refreshToken);
			}
			return true;
		});

export const authLogin = (authInfo) =>
	auth
		.signInWithEmailAndPassword(authInfo.email, authInfo.password)
		.then(authUser => ({ state: 'success', user: authUser }))
		.catch(error => ({ state: 'error', error }));

export const authLogout = () => auth.signOut();
