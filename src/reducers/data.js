export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_DATA':
			return action.data;
		default:
			return state;
	}
};
