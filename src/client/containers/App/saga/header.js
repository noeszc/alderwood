import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import invariant from 'invariant';

import apa, { getHKSToken } from 'client/services/apa';
import api from 'client/services/api';

import { updateDefaults } from 'client/utils/axios';
import { LOAD_HEADER } from '../constants';
import {
  pendingLoadHeader,
  headerLoaded,
  updateApaConfig,
  updateApiConfig,
  headerLoadingError,
  startupError,
  loadMetadata,
} from '../actions';
import { getHasHeaderLoadedOnce, getHKS, getRegion } from '../selectors/header';

export function* fetchHeader() {
  yield put(pendingLoadHeader());

  try {
    const hasLoadedOnce = yield select(getHasHeaderLoadedOnce);
    const params = {};

    if (hasLoadedOnce) {
      const HKS = yield select(getHKS);
      _.assign(params, { HKS });
    }

    const request = yield call(getHKSToken, params);
    const { status, errors, response } = request;

    invariant(
      _.parseInt(status) === 0 && _.isEmpty(errors),
      '(App/saga...) fetchHeader: Region not supported',
    );

    yield put(headerLoaded(response));

    const [HKS, region] = yield all([select(getHKS), select(getRegion)]);

    updateDefaults(apa, { params: { HKS, region } });
    updateDefaults(api, { params: { HKS, region } });

    yield all([
      put(updateApaConfig({ HKS, region })),
      put(updateApiConfig({ HKS, region })),
      put(loadMetadata()),
    ]);
  } catch (error) {
    yield all([put(headerLoadingError(error)), put(startupError())]);
  }
}

export default function* headerSaga() {
  yield takeLatest(LOAD_HEADER.ACTION, fetchHeader);
}
