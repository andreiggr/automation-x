export default (
	state = {
		user: undefined,
		loginError: undefined,
		signupError: undefined
	},
	action
) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				user: action.data.user,
				loginError: undefined
			};
		case 'LOGIN_FAILURE':
			return {
				...state,
				loginError: action.error.message,
				user: undefined
			};
		case 'SIGNUP_FAILURE':
			return {
				...state,
				signupError: action.error.message
			};
		case 'LOGOUT_SUCCESS':
			return '';
		default:
			return state;
	}
};
