import sagaHelper from 'redux-saga-testing';
import { put, call, all } from 'redux-saga/effects';

import { getNavigation } from 'client/services/api';
import {
  pendingLoadNavigation,
  navigationLoaded,
  navigationLoadingError,
  loadSession,
  startupError,
} from '../../actions';

import { fetchNavigation } from '../navigation';

describe('fetchNavigation', () => {
  const fixture = {
    status: 0,
    errors: [],
    response: {
      nodes: [],
    },
  };

  const { response } = fixture;

  const error = new Error(
    '(App/saga...) fetchNavigation: Region not supported',
  );

  describe('get navigation without errors', () => {
    const it = sagaHelper(fetchNavigation());

    it('should dispatch the "pendingLoadNavigation" action', result => {
      expect(result).toEqual(put(pendingLoadNavigation()));
    });

    it('should hit the API mfw', result => {
      expect(result).toEqual(call(getNavigation));
      return fixture;
    });

    it('on success dispatch the "navigationLoaded" and "loadSession" actions', result => {
      expect(result).toEqual(
        all([put(navigationLoaded(response)), put(loadSession())]),
      );
    });
  });

  describe('The API is broken and throws an exception', () => {
    const it = sagaHelper(fetchNavigation());

    it('should dispatch the "pendingLoadNavigation" action', result => {
      expect(result).toEqual(put(pendingLoadNavigation()));
    });

    it('should hit the API mfw, which will throw an exception', result => {
      expect(result).toEqual(call(getNavigation));
      return error;
    });

    it('should dispatch array of actions "navigationLoadingError" and "startupError"', result => {
      expect(result).toEqual(
        all([put(navigationLoadingError(error)), put(startupError())]),
      );
    });
  });
});
