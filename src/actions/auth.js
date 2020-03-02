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
export const PASSWORD_UPDATE_FAILURE = 'PASSWORD_UPDATE_FAILURE';


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

const receiveLogout = () => {
	return {
		type: LOGOUT_SUCCESS
	};
};

const logoutError = () => {
	return {
		type: LOGOUT_FAILURE
	};
};


export const loginUser = (email, password) => (dispatch) => {
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

export const signUp = (email, password) => (dispatch) => {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(() => {
		})
		.then(() => dispatch(loginUser(email, password)))
		.catch((error) => {
			dispatch(signupError(error));
		});
};

export const clearErrors = () => (dispatch) => {
	dispatch(signupError(""));
	dispatch(loginError(""));

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


export const doPasswordReset = (email) => (dispatch) => {
	firebase.auth.sendPasswordResetEmail(email);
};

export const doPasswordUpdate = (currentPassword, password) => (dispatch) => {
	var user = firebase.auth().currentUser;
	user
		.updatePassword(password)
		.then(() => {
		})
		.then(() => {
			dispatch(logoutUser());
		})
		.catch((error) => {
			dispatch(passwordUpdateError(error));
		});
};

const passwordUpdateError = (error) => {
	return {
		type: PASSWORD_UPDATE_FAILURE,
		error
	};
};

export const googleLogin = () => (dispatch) => {

	var googleProvider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(googleProvider)
		.then(user => {
			dispatch(loginError(''))
			dispatch(signupError(''))
			dispatch(receiveLogin(user));
		})
		.catch((error) => dispatch(loginError(error)));

}

export const gitLogin = () => (dispatch) => {

	var provider = new firebase.auth.GithubAuthProvider();

	firebase.auth().signInWithPopup(provider)
		.then(user => {
			dispatch(loginError(''))
			dispatch(signupError(''))
			dispatch(receiveLogin(user));
		})
		.catch((error) => dispatch(loginError(error)));

}
