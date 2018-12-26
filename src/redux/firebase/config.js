/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyC3oXsEPsXGm2UYNNNnrS4pgKgxKffNyb0',
  authDomain: 'retail-companion-dev.firebaseapp.com',
  databaseURL: 'https://retail-companion-dev.firebaseio.com',
  projectId: 'retail-companion-dev',
  storageBucket: 'retail-companion-dev.appspot.com',
  messagingSenderId: '291038736394',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
firebase.firestore().settings({ timestampsInSnapshots: true });
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
