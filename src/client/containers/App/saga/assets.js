import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import _ from 'lodash';
import invariant from 'invariant';

import { getAssets } from 'client/services/apa';
import { LOAD_ASSETS } from '../constants';
import {
  pendingLoadAssets,
  assetsLoaded,
  assetsLoadingError,
  startupError,
  loadNavigation,
} from '../actions';
import { getSessionAppKey } from '../selectors/config';

export function* fetchAssets() {
  yield put(pendingLoadAssets());
  try {
    const sessionKey = yield select(getSessionAppKey);

    const response = yield call(getAssets, { sessionKey });

    invariant(
      !_.has(response, 'error'),
      `(App/saga...) fetchAssets: Data not found or Unauthorized`,
    );

    yield all([put(assetsLoaded(response)), put(loadNavigation())]);
  } catch (error) {
    yield all([put(assetsLoadingError(error)), put(startupError())]);
  }
}

export default function* assetsSaga() {
  yield takeLatest(LOAD_ASSETS.ACTION, fetchAssets);
}
