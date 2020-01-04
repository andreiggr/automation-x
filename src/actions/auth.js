import firebase from '../Firebase/firebase';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';

export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const requestLogin = () => {
	return {
		type: LOGIN_REQUEST
	};
};

const receiveLogin = (data) => {
	return {
		type: LOGIN_SUCCESS,
		data
	};
};

const loginError = (error) => {
	return {
		type: LOGIN_FAILURE,
		error
	};
};
const signupError = (error) => {
	return {
		type: SIGNUP_FAILURE,
		error
	};
};

const requestLogout = () => {
	return {
		type: LOGOUT_REQUEST
	};
};

const receiveLogout = (user) => {
	return {
		type: LOGOUT_SUCCESS
	};
};

const logoutError = () => {
	return {
		type: LOGOUT_FAILURE
	};
};

const requestVerify = () => {
	return {
		type: VERIFY_REQUEST
	};
};

const verifySuccess = () => {
	return {
		type: VERIFY_SUCCESS
	};
};

export const loginUser = (email, password) => (dispatch) => {
	dispatch(requestLogin());
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((user) => {
			dispatch(receiveLogin(user));
		})
		.catch((error) => {
			//Do something with the error if you want!
			dispatch(loginError(error));
		});
};

export const logoutUser = () => (dispatch) => {
	dispatch(requestLogout());
	firebase
		.auth()
		.signOut()
		.then(() => {
			dispatch(receiveLogout());
		})
		.catch((error) => {
			//Do something with the error if you want!
			dispatch(logoutError());
		});
};

export const signUp = (email, password) => (dispatch) => {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(() => dispatch(signupError('')))
		.catch((error) => {
			dispatch(signupError(error));
		});
};

// class Firebase {
//     constructor() {
//       app.initializeApp(config);
//       this.auth = app.auth();
//     }
//     // *** Auth API ***
//     doCreateUserWithEmailAndPassword = (email, password) =>
//       this.auth.createUserWithEmailAndPassword(email, password);
//     doSignInWithEmailAndPassword = (email, password) =>
//       this.auth.signInWithEmailAndPassword(email, password);
//     doSignOut = () => this.auth.signOut();
//     doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
//     doPasswordUpdate = password =>
//       this.auth.currentUser.updatePassword(password);
//   }
