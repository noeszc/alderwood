import { all, call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import invariant from 'invariant';

import { getSession } from 'client/services/api';

import { LOAD_SESSION } from '../constants';

import {
  pendingLoadSession,
  sessionLoadingError,
  sessionLoaded,
  finishedBooting,
  telmexUserDetected,
} from '../actions';

export function* fetchSession() {
  yield put(pendingLoadSession());

  try {
    const request = yield call(getSession);
    const { status, errors, response } = request;

    if (_.has(response, ['userDetectWS'])) {
      return yield put(telmexUserDetected(response));
    }

    invariant(
      _.parseInt(status) === 0 && _.isEmpty(errors),
      '(App/saga...) fetchSession: User not logged in',
    );

    yield all([
      put(sessionLoaded(response)),
      put(finishedBooting({ rediectTo: 'homeuser' })),
    ]);
  } catch (error) {
    yield all([
      put(sessionLoadingError(error)),
      put(finishedBooting({ rediectTo: 'homeuser' })),
    ]);
  }
}

export default function* sessionSaga() {
  yield takeLatest(LOAD_SESSION.ACTION, fetchSession);
}
