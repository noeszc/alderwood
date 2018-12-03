import { takeLatest, put } from 'redux-saga/effects';
import { TELMEX_USER } from '../constants';
import { finishedBooting } from '../actions';

export function* telmexFlow() {
  yield put(finishedBooting({ redirectTo: 'userdetectwsregister' }));
}

export default function* telmexSaga() {
  yield takeLatest(TELMEX_USER.ACTION, telmexFlow);
}
