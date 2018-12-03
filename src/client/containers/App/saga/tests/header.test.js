import sagaHelper from 'redux-saga-testing';
import { put, select, call, all } from 'redux-saga/effects';
import faker from 'faker';
import { getHKSToken } from 'client/services/apa';
import { fetchHeader } from '../header';

import {
  pendingLoadHeader,
  headerLoaded,
  updateApaConfig,
  loadMetadata,
  updateApiConfig,
  headerLoadingError,
  startupError,
} from '../../actions';

import {
  getHasHeaderLoadedOnce,
  getHKS,
  getRegion,
} from '../../selectors/header';

describe('fetchHeader', () => {
  const HKS = faker.random.alphaNumeric();
  const region = 'mexico';
  const fixture = {
    status: 0,
    errors: [],
    response: {
      region,
      session_stringvalue: HKS,
    },
  };

  const error = new Error('(App/saga...) fetchHeader: Region not supported');

  const { response } = fixture;

  describe('there is no HKS for the user, and you get one successfully', () => {
    const it = sagaHelper(fetchHeader());

    it('should dispatch the "pendingLoadHeader" action', result => {
      expect(result).toEqual(put(pendingLoadHeader()));
    });

    it('there should not be a hks for an initial request', result => {
      expect(result).toEqual(select(getHasHeaderLoadedOnce));
      return false;
    });

    it('should hit APA service', result => {
      expect(result).toEqual(call(getHKSToken, {}));
      return fixture;
    });

    it('on success dispatch the "headerLoaded" action', result => {
      expect(result).toEqual(put(headerLoaded(response)));
    });

    it('select HKS and region, trigger array of actions', result => {
      expect(result).toEqual(all([select(getHKS), select(getRegion)]));
      return [HKS, region];
    });

    it('update clients and call the "loadMetadata" saga', result => {
      expect(result).toEqual(
        all([
          put(updateApaConfig({ HKS, region })),
          put(updateApiConfig({ HKS, region })),
          put(loadMetadata()),
        ]),
      );
    });
  });

  describe('The API is broken and throws an exception', () => {
    const it = sagaHelper(fetchHeader());

    it('should dispatch the "pendingLoadHeader" action', result => {
      expect(result).toEqual(put(pendingLoadHeader()));
    });
    it('there should not be a hks for an initial request', result => {
      expect(result).toEqual(select(getHasHeaderLoadedOnce));
      return false;
    });

    it('should hit APA service, which will throw an exception', result => {
      expect(result).toEqual(call(getHKSToken, {}));
      return error;
    });

    it('should dispatch array of actions "headerLoadingError" and "startupError"', result => {
      expect(result).toEqual(
        all([put(headerLoadingError(error)), put(startupError())]),
      );
    });
  });

  describe('there is an HKS for the user, and it is used to renew one', () => {
    const it = sagaHelper(fetchHeader());

    it('should dispatch the "pendingLoadHeader" action', result => {
      expect(result).toEqual(put(pendingLoadHeader()));
    });

    it('select "getHasHeaderLoadedOnce" to be true ', result => {
      expect(result).toEqual(select(getHasHeaderLoadedOnce));
      return true;
    });

    it('should get the value of HSK in the store', result => {
      expect(result).toEqual(select(getHKS));
      return HKS;
    });

    it('should hit APA service with the HSK in the params', result => {
      expect(result).toEqual(call(getHKSToken, { HKS }));
      return fixture;
    });

    it('on success dispatch the "headerLoaded" action', result => {
      expect(result).toEqual(put(headerLoaded(response)));
    });

    it('select HKS and region, trigger array of actions', result => {
      expect(result).toEqual(all([select(getHKS), select(getRegion)]));
      return [HKS, region];
    });

    it('update clients and call the "loadMetadata" saga', result => {
      expect(result).toEqual(
        all([
          put(updateApaConfig({ HKS, region })),
          put(updateApiConfig({ HKS, region })),
          put(loadMetadata()),
        ]),
      );
    });
  });
});
