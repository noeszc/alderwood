import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'client/utils/history';
import appReducer from 'client/containers/App/reducer';

export default function createReducer(injectedReducers) {
  return combineReducers({
    app: appReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
}
