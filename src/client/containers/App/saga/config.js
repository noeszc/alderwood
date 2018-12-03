import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import _ from 'lodash';
import invariant from 'invariant';

import { updateDefaults } from 'client/utils/axios';
import apa from 'client/services/apa';
import api from 'client/services/api';

import { LOAD_CONFIG } from '../constants';

import {
  configLoaded,
  pendingLoadConfig,
  updateApaConfig,
  updateApiConfig,
  loadHeader,
  configLoadingError,
} from '../actions';

import {
  getApiDefaultParams,
  getApaBaseURL,
  getApiBaseURL,
} from '../selectors/config';

export function* setupAsyncClients() {
  yield put(pendingLoadConfig());
  try {
    const { config } = yield call([Reflect, 'get'], window, 'REDUX_DATA');

    invariant(
      !_.isEmpty(config),
      '(App/saga...) setupClients: Client config not defined',
    );

    yield put(configLoaded(config));

    const [apiDefaultParams, APA_BASE_URL, API_BASE_URL] = yield all([
      select(getApiDefaultParams),
      select(getApaBaseURL),
      select(getApiBaseURL),
    ]);

    updateDefaults(apa, { baseURL: APA_BASE_URL, params: apiDefaultParams });
    updateDefaults(api, { baseURL: API_BASE_URL, params: apiDefaultParams });

    yield all([
      put(updateApaConfig({ baseURL: APA_BASE_URL })),
      put(updateApiConfig({ baseURL: API_BASE_URL })),
      put(loadHeader()),
    ]);
  } catch (error) {
    yield put(configLoadingError());
  } finally {
    yield call([Reflect, 'deleteProperty'], window, 'REDUX_DATA');
  }
}

export default function* configSaga() {
  yield takeLatest(LOAD_CONFIG.ACTION, setupAsyncClients);
}
