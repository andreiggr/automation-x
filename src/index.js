import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import App from './App';
import configureStore from 'store/store';
import { PersistGate } from 'redux-persist/integration/react'

const store = configureStore();

ReactDOM.render(
	<Provider store={store.store}>
		<PersistGate
			loading={null}
			persistor={store.persistor}
		>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
