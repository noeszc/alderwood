import _ from 'lodash';
import { takeLatest, put, select, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { BOOTING } from '../constants';
import { booting, loadConfig } from '../actions';
import { getRegion } from '../selectors/header';

export function* bootingError() {
  yield put(push('/not-supported'));
}

export function* finishedBooting(action) {
  const REDIRECT_URL = _.get(action, ['payload', 'redirectTo'], 'homeuser');

  const REGION = yield select(getRegion);
  const HOME_PAGE = `/${REGION}/${REDIRECT_URL}`;

  yield put(push(HOME_PAGE));
}

export function* onStartBooting() {
  yield put(booting());
  yield put(loadConfig());
}

export default function* bootingSaga() {
  yield takeLatest(BOOTING.ERROR, bootingError);
  yield takeLatest(BOOTING.SUCCESS, finishedBooting);
  yield call(onStartBooting);
}
