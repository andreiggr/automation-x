export default (state = [], action) => {
	switch (action.type) {
		case 'SELECT_PRODUCT':
			return action.selectedProduct;
		default:
			return state;
	}
};
