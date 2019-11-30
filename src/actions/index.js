import firebase from '../Firebase/firebase';

export function fetchDataSuccess(data) {
	return {
		type: 'FETCH_DATA',
		data
	};
}

export const fetchData = () => (dispatch) => {
	const dataRef = firebase.database().ref('models');

	dataRef.on('value', (snapshot) => {
		let items = snapshot.val();

		dispatch(fetchDataSuccess(items));
	});
};
