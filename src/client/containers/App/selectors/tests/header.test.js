import _ from 'lodash';
import faker from 'faker';

import {
  getHeaderState,
  getHasHeaderLoadedOnce,
  getHeaderModel,
  getHKS,
  getRegion,
} from '../header';

export const appHeader = {
  hasLoadedOnce: false,
  model: {
    session_stringvalue: faker.random.alphaNumeric(26),
    region: faker.address.country(),
  },
};

describe('getHeaderState', () => {
  const mockedState = {
    app: {
      header: appHeader,
    },
  };

  it('should select the header state', () => {
    expect(getHeaderState(mockedState)).toEqual(appHeader);
  });

  describe('getHasHeaderLoadedOnce', () => {
    it('should select if the header was already loaded once', () => {
      expect(getHasHeaderLoadedOnce(mockedState)).toEqual(
        _.get(appHeader, 'hasLoadedOnce'),
      );
    });
  });

  describe('getHeaderModel', () => {
    it('should select the header model', () => {
      expect(getHeaderModel(mockedState)).toEqual(_.get(appHeader, 'model'));
    });
  });

  describe('getHKS', () => {
    it('should select the HKS token', () => {
      expect(getHKS(mockedState)).toEqual(
        _.get(appHeader, ['model', 'session_stringvalue']),
      );
    });
  });

  describe('getRegion', () => {
    it('should select the region/country', () => {
      expect(getRegion(mockedState)).toEqual(
        _.get(appHeader, ['model', 'region']),
      );
    });
  });
});
