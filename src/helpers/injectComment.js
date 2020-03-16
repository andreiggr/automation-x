export const injectComment = (state, id, commentId, comment) => {
	var product = state[id];
	var newComments = {
		...product.comments
	};
	newComments[`${commentId}`] = comment;
	var newProduct = { ...product, comments: newComments };

	var newState = [ ...state.slice(0, id), newProduct, ...state.slice(id + 1) ];
	return newState;
};
