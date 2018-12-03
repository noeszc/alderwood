import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import _ from 'lodash';
import invariant from 'invariant';

import { getMetadata } from 'client/services/apa';
import { LOAD_METADATA } from '../constants';
import {
  pendingLoadMetadata,
  metadataLoaded,
  metadataLoadingError,
  startupError,
  loadAssets,
} from '../actions';
import { getSessionAppKey } from '../selectors/config';

export function* fetchMetadata() {
  yield put(pendingLoadMetadata());
  try {
    const sessionKey = yield select(getSessionAppKey);

    const response = yield call(getMetadata, { sessionKey });

    invariant(
      !_.has(response, 'error'),
      `(App/saga...) fetchMetadata: Data not found or Unauthorized`,
    );

    yield all([put(metadataLoaded(response)), put(loadAssets())]);
  } catch (error) {
    yield all([put(metadataLoadingError(error)), put(startupError())]);
  }
}

export default function* meatadataSaga() {
  yield takeLatest(LOAD_METADATA.ACTION, fetchMetadata);
}
