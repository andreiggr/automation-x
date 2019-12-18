import { injectGitData } from 'helpers/gitLinks';

export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_DATA':
			return injectGitData(action.data);
		default:
			return state;
	}
};
