import { firestore } from './firebase';

// Get Current User Info
export const getCurrentUser = (userId) =>
	firestore.collection('users').doc(userId).get();
