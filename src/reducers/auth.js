
export default (state = {
    user: {},
    loginError: '',
}, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return action.data.user;
        case 'LOGIN_FAILURE':
            return state;
        case 'LOGOUT_SUCCESS':
            return '';
        default:
            return state;
    }
};