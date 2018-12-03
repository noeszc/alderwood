import sagaHelper from 'redux-saga-testing';
import { put, select, call, all } from 'redux-saga/effects';
import faker from 'faker';
import { getMetadata } from 'client/services/apa';
import { fetchMetadata } from '../metadata';
import {
  pendingLoadMetadata,
  metadataLoaded,
  loadAssets,
  metadataLoadingError,
  startupError,
} from '../../actions';
import { getSessionAppKey } from '../../selectors/config';

describe('fetchMetadata', () => {
  const sessionKey = `${faker.random.alphaNumeric(
    12,
  )}-${faker.address.country()}`;

  const fixture = {
    APIVersion: 'v3',
    akamai_server_ip: faker.internet.ip(),
  };

  const error = new Error(
    '(App/saga...) fetchMetadata: Data not found or Unauthorized',
  );

  describe('get metadata without errors', () => {
    const it = sagaHelper(fetchMetadata());

    it('should dispatch the "pendingLoadMetadata" action', result => {
      expect(result).toEqual(put(pendingLoadMetadata()));
    });

    it('should get the "sessionKey" from the store', result => {
      expect(result).toEqual(select(getSessionAppKey));
      return sessionKey;
    });

    it('should hit APA service with the sessionKey in the params', result => {
      expect(result).toEqual(call(getMetadata, { sessionKey }));
      return fixture;
    });

    it('on success dispatch the "metadataLoaded" and "loadAssets" actions', result => {
      expect(result).toEqual(
        all([put(metadataLoaded(fixture)), put(loadAssets())]),
      );
    });
  });

  describe('The API is broken and throws an exception', () => {
    const it = sagaHelper(fetchMetadata());

    it('should dispatch the "pendingLoadMetadata" action', result => {
      expect(result).toEqual(put(pendingLoadMetadata()));
    });

    it('should get the "sessionKey" from the store', result => {
      expect(result).toEqual(select(getSessionAppKey));
      return sessionKey;
    });

    it('should hit APA service, which will throw an exception', result => {
      expect(result).toEqual(call(getMetadata, { sessionKey }));
      return error;
    });

    it('should dispatch array of actions "metadataLoadingError" and "startupError"', result => {
      expect(result).toEqual(
        all([put(metadataLoadingError(error)), put(startupError())]),
      );
    });
  });
});
