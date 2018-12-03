import {
  loadHeader,
  headerLoaded,
  headerLoadingError,
  pendingLoadHeader,
  loadConfig,
  pendingLoadConfig,
  configLoaded,
  configLoadingError,
  updateApaConfig,
  updateApiConfig,
  booting,
  finishedBooting,
  bootingPending,
} from '../actions';
import {
  LOAD_HEADER,
  LOAD_CONFIG,
  UPDATE_CLIENT_CONFIG,
  BOOTING,
} from '../constants';

describe('App actions', () => {
  describe('startup', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: BOOTING.ACTION,
      };
      expect(booting()).toEqual(expectedResult);
    });
  });

  describe('startupPending', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: BOOTING.PENDING,
      };
      expect(bootingPending()).toEqual(expectedResult);
    });
  });

  describe('startupCompleted', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: BOOTING.SUCCESS,
      };
      expect(finishedBooting()).toEqual(expectedResult);
    });
  });

  describe('loadConfig', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_CONFIG.ACTION,
      };
      expect(loadConfig()).toEqual(expectedResult);
    });
  });

  describe('pendingLoadConfig', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_CONFIG.PENDING,
      };
      expect(pendingLoadConfig()).toEqual(expectedResult);
    });
  });

  describe('configLoaded', () => {
    it('should return the correct type and the passed config object', () => {
      const fixture = {
        appKey: 'XXYYZZZ',
        apiVersion: 'v5.82',
        paths: {},
      };
      const expectedResult = {
        type: LOAD_CONFIG.SUCCESS,
        payload: fixture,
      };
      expect(configLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('configLoadingError', () => {
    it('should return the correct type and the error', () => {
      const error = new Error('Something went wrong!');
      const expectedResult = {
        type: LOAD_CONFIG.ERROR,
        payload: error,
        error: true,
      };
      expect(configLoadingError(error)).toEqual(expectedResult);
    });
  });

  describe('loadHeader', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_HEADER.ACTION,
      };
      expect(loadHeader()).toEqual(expectedResult);
    });
  });

  describe('pendingLoadHeader', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_HEADER.PENDING,
      };
      expect(pendingLoadHeader()).toEqual(expectedResult);
    });
  });

  describe('headerLoaded', () => {
    it('should return the correct type and the passed header info', () => {
      const fixture = {
        region: 'mexico',
      };
      const expectedResult = {
        type: LOAD_HEADER.SUCCESS,
        payload: fixture,
      };
      expect(headerLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('headerLoadingError', () => {
    it('should return the correct type and the error', () => {
      const error = new Error('Something went wrong!');
      const expectedResult = {
        type: LOAD_HEADER.ERROR,
        payload: error,
        error: true,
      };
      expect(headerLoadingError(error)).toEqual(expectedResult);
    });
  });

  describe('setToApaConfig', () => {
    it('should return the correct type and pased payload', () => {
      const fixture = {
        baseURL: 'https://example.foo',
      };
      const expectedResult = {
        type: UPDATE_CLIENT_CONFIG.APA,
        payload: fixture,
      };
      expect(updateApaConfig(fixture)).toEqual(expectedResult);
    });
  });

  describe('setToApiConfig', () => {
    it('should return the correct type and pased payload', () => {
      const fixture = {
        baseURL: 'https://example.foo',
      };
      const expectedResult = {
        type: UPDATE_CLIENT_CONFIG.API,
        payload: fixture,
      };
      expect(updateApiConfig(fixture)).toEqual(expectedResult);
    });
  });
});
