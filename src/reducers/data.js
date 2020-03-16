import { injectGitData } from 'helpers/gitLinks';
import { injectComment } from 'helpers/injectComment';

export default (state = [], action) => {
	const { data, productId, newComment, commentId } = action;
	switch (action.type) {
		case 'FETCH_DATA':
			return injectGitData(data);
		case 'ADD_COMMENT':
			return injectComment(state, productId, commentId, newComment);
		default:
			return state;
	}
};
