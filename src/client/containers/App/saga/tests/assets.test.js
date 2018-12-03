import sagaHelper from 'redux-saga-testing';
import { put, select, call, all } from 'redux-saga/effects';
import faker from 'faker';
import { getAssets } from 'client/services/apa';

import {
  assetsLoaded,
  assetsLoadingError,
  startupError,
  pendingLoadAssets,
  loadNavigation,
} from '../../actions';
import { getSessionAppKey } from '../../selectors/config';
import { fetchAssets } from '../assets';

describe('fetchAssets', () => {
  const sessionKey = `${faker.random.alphaNumeric(
    12,
  )}-${faker.address.country()}`;

  const fixture = {
    one: faker.image.avatar(),
    two: faker.image.avatar(),
  };

  const error = new Error(
    '(App/saga...) fetchAssets: Data not found or Unauthorized',
  );

  describe('get assets without errors', () => {
    const it = sagaHelper(fetchAssets());

    it('should dispatch the "pendingLoadAssets" action', result => {
      expect(result).toEqual(put(pendingLoadAssets()));
    });

    it('should get the "sessionKey" from the store', result => {
      expect(result).toEqual(select(getSessionAppKey));
      return sessionKey;
    });

    it('should hit APA service with the sessionKey in the params', result => {
      expect(result).toEqual(call(getAssets, { sessionKey }));
      return fixture;
    });

    it('on success dispatch the "assetsLoaded" and "loadNavigation" actions', result => {
      expect(result).toEqual(
        all([put(assetsLoaded(fixture)), put(loadNavigation())]),
      );
    });
  });

  describe('The API is broken and throws an exception', () => {
    const it = sagaHelper(fetchAssets());

    it('should dispatch the "pendingLoadAssets" action', result => {
      expect(result).toEqual(put(pendingLoadAssets()));
    });

    it('should get the "sessionKey" from the store', result => {
      expect(result).toEqual(select(getSessionAppKey));
      return sessionKey;
    });

    it('should hit APA service, which will throw an exception', result => {
      expect(result).toEqual(call(getAssets, { sessionKey }));
      return error;
    });

    it('should dispatch array of actions "assetsLoadingError" and "startupError"', result => {
      expect(result).toEqual(
        all([put(assetsLoadingError(error)), put(startupError())]),
      );
    });
  });
});
