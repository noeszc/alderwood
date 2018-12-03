import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from 'shared/redux/reducers/combine';
import rootSaga, { runWatchers } from 'shared/redux/sagas/root.saga';

function getStore() {
  let preloadedState = {};
  if (typeof window !== 'undefined' && window.REDUX_DATA) {
    preloadedState = window.REDUX_DATA;
    delete window.REDUX_DATA;
  }

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(
    Object.prototype.hasOwnProperty.call(preloadedState, 'general')
      ? runWatchers
      : rootSaga,
  );

  return store;
}

export default getStore;

// import { createLogger } from 'redux-logger';

// import { middlewares } from "./middleware/index";

// const toApply = [thunks, middlewares];

// if (process.env.LOGGER === 'true') {
//   toApply.push(createLogger());
// }
