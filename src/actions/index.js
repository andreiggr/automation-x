import { dataRef } from '../Firebase/firebase';

export const FETCH_DATA = 'FETCH_DATA';

export const fetchData = () => async (dispatch) => {
	dataRef.on('value', (snapshot) => {
		dispatch({
			type: FETCH_DATA,
			payload: snapshot.val()
		});
	});
};
