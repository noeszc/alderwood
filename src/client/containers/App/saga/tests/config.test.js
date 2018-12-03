import sagaHelper from 'redux-saga-testing';
import { put, select, call, all } from 'redux-saga/effects';
import faker from 'faker';

import {
  pendingLoadConfig,
  configLoaded,
  updateApaConfig,
  updateApiConfig,
  loadHeader,
} from '../../actions';

import { setupAsyncClients } from '../config';
import {
  getApiDefaultParams,
  getApaBaseURL,
  getApiBaseURL,
} from '../../selectors/config';

describe('setupAsyncClients', () => {
  const fixture = {
    config: {
      appKey: faker.random.alphaNumeric(12),
      apiVersion: 'v1.0',
    },
  };
  const { config } = fixture;
  const baseURL = faker.internet.url();

  const it = sagaHelper(setupAsyncClients());

  it('should dispatch the "pendingLoadConfig" action', result => {
    expect(result).toEqual(put(pendingLoadConfig()));
  });

  it('should be retrive config from the window object', result => {
    expect(result).toEqual(call([Reflect, 'get'], window, 'REDUX_DATA'));
    return fixture;
  });

  it('on success dispatch the "configLoaded" action', result => {
    expect(result).toEqual(put(configLoaded(config)));
  });

  it('should select params from the config', result => {
    expect(result).toEqual(
      all([
        select(getApiDefaultParams),
        select(getApaBaseURL),
        select(getApiBaseURL),
      ]),
    );

    return [{}, baseURL, baseURL];
  });

  it('update clients and call the "loadHeader" saga', result => {
    expect(result).toEqual(
      all([
        put(updateApaConfig({ baseURL })),
        put(updateApiConfig({ baseURL })),
        put(loadHeader()),
      ]),
    );
  });

  it('should delete config from the window object', result => {
    expect(result).toEqual(
      call([Reflect, 'deleteProperty'], window, 'REDUX_DATA'),
    );
  });
});
