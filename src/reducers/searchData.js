export default (state = '', action) => {
    switch (action.type) {
        case 'SEARCH_DATA':
            return action.searchData;
        default:
            return state;
    }
};