import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: 'AIzaSyDU5idAuE8NMyFXlvyDRkO2B91ItyEWHNU',
	authDomain: 'automation-app-xyz3.firebaseapp.com',
	databaseURL: 'https://automation-app-xyz3.firebaseio.com',
	projectId: 'au§tomation-app-xyz3',
	storageBucket: 'automation-app-xyz3.appspot.com',
	messagingSenderId: '859750510974',
	appId: '1:859750510974:web:f7cc2abf35a8050c0c432f',
	measurementId: 'G-9DL4322GG1'
};

firebase.initializeApp(config);
//const databaseRef = firebase.database().ref();
//export const dataRef = databaseRef.child('data');
export default firebase;
