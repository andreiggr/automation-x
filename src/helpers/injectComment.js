export const injectComment = (state, id, comment) => {
	console.log(id);
	var newState = [
		...state,
		{
			...state[id],
			comments: {
				...state[id].comments,
				comment
			}
		}
	];
	console.log('newstate', newState);
	// var newState = [ ...state ].map((product, index) => {
	// 	if (index === id) {
	// 		var newProduct = {
	// 			...product,
	// 			comments: {}
	// 		};
	// 	}
	// });

	return newState;
};
