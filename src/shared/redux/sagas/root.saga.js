import {
  call, take, takeLatest, put, all,
} from 'redux-saga/effects';
import getApaMetadata from 'shared/api/getApaMetadata';
import {
  UPDATE_START_METADATA,
  UPDATE_SUCCESS_METADATA,
  START_SET_COMMON_CONFIG,
  END_SET_COMMON_CONFIG,
} from 'shared/redux/types/config';

const updateSuccessMetadata = metadata => ({
  type: UPDATE_SUCCESS_METADATA,
  metadata,
});
export const updateStartMetadata = config => ({
  type: UPDATE_START_METADATA,
  data: config,
});
export const setCommonConfig = config => ({
  type: START_SET_COMMON_CONFIG,
  data: config,
});

export function* startCommonConfig(config) {
  yield put({ type: END_SET_COMMON_CONFIG, data: config });
}

export function* watchApiApaMetadata(action) {
  try {
    yield console.log(action);
  } catch (error) {}
  /* const { data } = yield take(UPDATE_START_METADATA);
  const apiResponse = yield call(getApaMetadata, data);
  yield put(updateSuccessMetadata(apiResponse)); */
}

export function* runWatchers() {
  yield all([call(watchApiApaMetadata)]);
}

export function* bootstrap({ data }) {
  yield put({ type: END_SET_COMMON_CONFIG, payload: data });
}

export default function* rootSaga() {
  /* const { config } = yield takeLatest(START_SET_COMMON_CONFIG);
  yield call(startCommonConfig, config);
  yield runWatchers(); */
  yield all([
    takeLatest(START_SET_COMMON_CONFIG, bootstrap),
    // takeLatest(UPDATE_START_METADATA, watchApiApaMetadata),
  ]);
}
