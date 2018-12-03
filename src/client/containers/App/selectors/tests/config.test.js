import faker from 'faker';
import _ from 'lodash';
import {
  getConfigState,
  getConfigModel,
  getPathDomains,
  getApiBaseURL,
  getApaBaseURL,
  getApiDefaultParams,
  getAppKey,
  getSessionAppKey,
} from '../config';

import { appHeader } from './header.test';

describe('getConfigState', () => {
  const appConfig = {
    model: {
      apiParamsDefault: {},
      paths: {
        microfwkDomain: faker.internet.url(),
        apaDomain: faker.internet.url(),
      },
      appKey: faker.random.alphaNumeric(24),
    },
  };

  const mockedState = {
    app: {
      config: appConfig,
      header: appHeader,
    },
  };

  it('should select the config state', () => {
    expect(getConfigState(mockedState)).toEqual(appConfig);
  });

  describe('getConfigModel', () => {
    it('should select the application configuration object', () => {
      expect(getConfigModel(mockedState)).toEqual(_.get(appConfig, 'model'));
    });
  });

  describe('getPathDomains', () => {
    it('should select the urls to the services', () => {
      expect(getPathDomains(mockedState)).toEqual(
        _.get(appConfig, ['model', 'paths']),
      );
    });
  });

  describe('getApiBaseUrl', () => {
    it('should select the API base url', () => {
      expect(getApiBaseURL(mockedState)).toEqual(
        _.get(appConfig, ['model', 'paths', 'microfwkDomain']),
      );
    });
  });

  describe('getApaBaseURL', () => {
    it('should select the APA base url', () => {
      expect(getApaBaseURL(mockedState)).toEqual(
        _.get(appConfig, ['model', 'paths', 'apaDomain']),
      );
    });
  });

  describe('getApiDefaultParams', () => {
    it('should select the default params for requests', () => {
      expect(getApiDefaultParams(mockedState)).toEqual(
        _.get(appConfig, ['model', 'apiParamsDefault']),
      );
    });
  });

  describe('getAppKey', () => {
    it('should seletec the app key', () => {
      expect(getAppKey(mockedState)).toEqual(
        _.get(appConfig, ['model', 'appKey']),
      );
    });
  });

  describe('getSessionAppKey', () => {
    it('should selected concatenation of the "region" and the "appKey"', () => {
      const appKey = _.get(appConfig, ['model', 'appKey']);
      const region = _.get(appHeader, ['model', 'region']);

      expect(getSessionAppKey(mockedState)).toEqual(`${appKey}-${region}`);
    });
  });
});
