import { takeLatest, put, call, all } from 'redux-saga/effects';
import _ from 'lodash';
import invariant from 'invariant';

import { getNavigation } from 'client/services/api';

import { LOAD_NAVIGATION } from '../constants';
import {
  pendingLoadNavigation,
  navigationLoaded,
  loadSession,
  navigationLoadingError,
  startupError,
} from '../actions';

export function* fetchNavigation() {
  yield put(pendingLoadNavigation());
  try {
    const request = yield call(getNavigation);
    const { status, errors, response } = request;

    invariant(
      _.parseInt(status) === 0 && _.isEmpty(errors),
      '(App/saga...) fetchNavigation: Region not supported',
    );

    yield all([put(navigationLoaded(response)), put(loadSession())]);
  } catch (error) {
    yield all([put(navigationLoadingError(error)), put(startupError())]);
  }
}

export default function* navigationSaga() {
  yield takeLatest(LOAD_NAVIGATION.ACTION, fetchNavigation);
}
