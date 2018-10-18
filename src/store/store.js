import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
	const middlewares = [
		sagaMiddleware,
	];
	const enhancers = [
		applyMiddleware(...middlewares),
	];

	const composeEnhancers =
		process.env.NODE_ENV !== 'production' &&
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

	const store = createStore(
		createReducer(),
		initialState,
		composeEnhancers(...enhancers),
	);

	sagaMiddleware.run(rootSaga);

	return store;
}
