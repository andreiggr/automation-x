export default (state = '', action) => {
    switch (action.type) {
        case 'ACTIVE_FILTER':
            return action.activeFilter;
        default:
            return state;
    }
};