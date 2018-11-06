import { auth, firestore, storage } from './config';

export const getData = (data) =>
	firestore.collection(data).get()
		.then(res => {
			const response = [];
			res.forEach(item => {
				response.push(item.data());
			});
			return response;
		});

export const addData = (field, data) => firestore.collection(field).add(data)
		.then(res => res);

// export const addUsersToLocations = (data, optional) => {
// 	console.log(data, optional);
// 	return firestore.collection(data).get()
// 		.then(res => res)
// 		.then(res => data.map(item => res.collection('users').add(item)));
// 	// return firestore.collection('locations').set(data)
// 	// 	.then(res => res);
// };

export const authLogin = (authInfo) =>
	auth.signInWithEmailAndPassword(authInfo.email, authInfo.password)
		.then(authUser => ({ state: 'success', user: authUser }))
		.catch(error => ({ state: 'error', error }));

export const authLogout = () => auth.signOut();

export const getCurrentUser = (userId) =>
	firestore.collection('users')
		.doc(userId)
		.get()
		.then(user => user);

export const deleteTmpImage = (file) =>
	storage.ref().child(file.metadata.fullPath)
		.delete()
		.then(res => res);

export const uploadImage = (path, file) =>
	storage.ref().child(path)
		.child(file.name)
		.put(file)
		.then(res => res);

export const getToken = (authUser) =>
	authUser.user.getIdToken()
		.then(token => {
			if (localStorage.getItem('token') === null) {
				localStorage.setItem('token', token);
				localStorage.setItem('refreshToken', authUser.user.refreshToken);
			}
			return true;
		});
