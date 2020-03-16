import firebase from '../Firebase/firebase';
import { injectComment } from 'helpers/injectComment';

export const ADD_COMMENT = 'ADD_COMMENT';

export const addComment = (user, description, product) => (dispatch) => {
	const date = new Date(Date.now()).toLocaleString();

	const newComment = {
		user,
		description,
		date,
		rating: 4
	};
	firebase
		.database()
		.ref('models/' + product.id + '/comments')
		.push(newComment)
		.then((e) => dispatch(receiveComment(newComment, product.id, e)));
	// dispatch(receiveComment(newComment, productId)));
};

export const receiveComment = (newComment, productId, event) => {
	const commentId = event.path.pieces_[event.path.pieces_.length - 1];
	return {
		type: ADD_COMMENT,
		newComment,
		commentId,
		productId
	};
};

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

export const setActiveFilter = (activeFilter) => {
	return {
		type: 'ACTIVE_FILTER',
		activeFilter
	};
};

export const setSearchData = (searchData) => {
	return {
		type: 'SEARCH_DATA',
		searchData
	};
};

export const resetFilters = () => {
	setActiveFilter('');
};

export const resetSearchData = () => {
	setSearchData('');
};
