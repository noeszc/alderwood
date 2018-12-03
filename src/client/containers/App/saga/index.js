import { all, fork } from 'redux-saga/effects';
import configSaga from './config';

import headerSaga from './header';
import navigationSaga from './navigation';
import sessionSaga from './session';
import bootingSaga from './booting';
import telmexSaga from './telmex';
import meatadataSaga from './metadata';
import assetsSaga from './assets';

export default function* appSaga() {
  yield all([
    fork(configSaga),
    fork(headerSaga),
    fork(meatadataSaga),
    fork(assetsSaga),
    fork(navigationSaga),
    fork(telmexSaga),
    fork(sessionSaga),
    fork(bootingSaga),
  ]);
}
