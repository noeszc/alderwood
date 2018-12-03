import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const ROOT_REDUX_PERSIST = {
  key: 'root',
  storage,
  blacklist: ['router', 'app'],
};

export default function configureStore(initialState = {}, history) {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];

  const globalReducer = connectRouter(history)(createReducer(initialState));
  const persistedReducer = persistReducer(ROOT_REDUX_PERSIST, globalReducer);

  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  /* eslint-enable */

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(...enhancers),
  );

  const persistor = persistStore(store);

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  return { store, persistor };
}
