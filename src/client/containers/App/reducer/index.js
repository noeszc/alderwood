import { combineReducers } from 'redux';
import config from './config';
import header from './header';
import ready from './ready';
import navigation from './navigation';
import session from './session';
import metadata from './metadata';
import assets from './assets';

const appReducer = combineReducers({
  config,
  header,
  metadata,
  assets,
  ready,
  navigation,
  session,
});

export default appReducer;
