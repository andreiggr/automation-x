import firebase from '../Firebase/firebase';
import { fetchData } from 'actions';

export const ADD_COMMENT = 'ADD_COMMENT';

export const addComment = (user, description, productId) => (dispatch) => {
	const date = new Date(Date.now()).toLocaleString();

	const newComment = {
		user,
		description,
		date,
		rating: 4
	};
	firebase.database().ref('models/' + productId + '/comments').push(newComment).then(() => dispatch(fetchData()));
	// dispatch(receiveComment(newComment, productId)));
};

export const receiveComment = (newComment, productId) => {
	return {
		type: ADD_COMMENT,
		newComment,
		productId
	};
};
