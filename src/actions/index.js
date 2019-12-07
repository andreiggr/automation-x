import firebase from '../Firebase/firebase';

export function fetchDataSuccess(data) {
	return {
		type: 'FETCH_DATA',
		data
	};
}

export const fetchData = () => async (dispatch) => {
	const dataRef = firebase.database().ref('models');

	await dataRef.on('value', (snapshot) => {
		let items = snapshot.val();

		dispatch(fetchDataSuccess(items));
	});
};

export const selectProduct = (selectedProduct) => {
	return {
		type: 'SELECT_PRODUCT',
		selectedProduct
	};
};
