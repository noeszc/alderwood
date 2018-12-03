import sagaHelper from 'redux-saga-testing';
import faker from 'faker';
import { put, call, all } from 'redux-saga/effects';

import { getSession } from 'client/services/api';
import {
  pendingLoadSession,
  sessionLoadingError,
  finishedBooting,
  telmexUserDetected,
} from '../../actions';

import { fetchSession } from '../session';

describe('fetchSession', () => {
  const error = new Error('(App/saga...) fetchSession: User not logged in');

  describe('the user has not logged in', () => {
    const fixture = {
      status: '1',
      errors: {
        error: ['El usuario no esta logueado'],
        code: 'usuario_no_logueado',
      },
      response: {
        is_user_logged_in: 0,
        superhighlight: ['anonymous'],
      },
    };

    const it = sagaHelper(fetchSession());

    it('should dispatch the "pendingLoadSession" action', result => {
      expect(result).toEqual(put(pendingLoadSession()));
    });

    it('should hit the API mfw, which will throw an exception', result => {
      expect(result).toEqual(call(getSession));
      return fixture;
    });

    it('after the invariant dispatch the "sessionLoadingError" and "finishedBooting" actions', result => {
      expect(result).toEqual(
        all([
          put(sessionLoadingError(error)),
          put(finishedBooting({ rediectTo: 'homeuser' })),
        ]),
      );
    });
  });

  describe('user with IP Telmex not logged in', () => {
    const it = sagaHelper(fetchSession());

    const fixture = {
      status: '1',
      errors: {
        error: ['El usuario no esta logueado'],
        code: 'usuario_no_logueado',
      },
      response: {
        is_user_logged_in: 0,
        userDetectWS: {
          account: faker.random.number(10),
          ip: faker.internet.ip(),
          url: faker.internet.url(),
          msg: 'Y',
        },
      },
    };

    const { response } = fixture;

    it('should dispatch the "pendingLoadSession" action', result => {
      expect(result).toEqual(put(pendingLoadSession()));
    });

    it('should hit the API mfw', result => {
      expect(result).toEqual(call(getSession));
      return fixture;
    });

    it('WS user detected, should dispatch the "telmexUserDetected" action', result => {
      expect(result).toEqual(put(telmexUserDetected(response)));
    });
  });
});
