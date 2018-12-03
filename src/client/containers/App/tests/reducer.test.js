import assign from 'lodash/assign';
import headerReducer from '../reducer/header';
import configReducer from '../reducer/config';
import readyReducer from '../reducer/ready';
import {
  pendingLoadHeader,
  headerLoaded,
  headerLoadingError,
  pendingLoadConfig,
  configLoaded,
  configLoadingError,
  bootingPending,
  finishedBooting,
} from '../actions';

describe('appReducer', () => {
  describe('readyReducer', () => {
    let state;
    beforeEach(() => {
      state = false;
    });

    it('should return the initial state', () => {
      const expectedResult = state;
      expect(readyReducer(undefined, {})).toEqual(expectedResult);
    });

    it('should handle the startupPending action correctly', () => {
      const expectedResult = false;
      expect(readyReducer(state, bootingPending())).toEqual(expectedResult);
    });

    it('should handle the startupCompleted action correctly', () => {
      const expectedResult = true;
      expect(readyReducer(state, finishedBooting())).toEqual(expectedResult);
    });
  });

  describe('configReducer', () => {
    let state;
    beforeEach(() => {
      state = {
        loading: false,
        model: null,
        error: false,
      };
    });

    it('should return the initial state', () => {
      const expectedResult = state;
      expect(configReducer(undefined, {})).toEqual(expectedResult);
    });

    it('should handle the pendingLoadConfig action correctly', () => {
      const expectedResult = assign(state, { loading: true });
      expect(headerReducer(state, pendingLoadConfig())).toEqual(expectedResult);
    });

    it('should handle the configLoaded action correctly', () => {
      const fixture = { appKey: 'QrXubyJqJ3', apiVersion: 'v5.82' };
      const expectedResult = assign(state, {
        loading: false,
        model: fixture,
      });
      expect(headerReducer(state, configLoaded(fixture))).toEqual(
        expectedResult,
      );
    });

    it('should handle the configLoadingError action correctly', () => {
      const fixture = new Error('Something was wrong');
      const expectedResult = assign(state, { loading: false, error: true });

      expect(headerReducer(state, configLoadingError(fixture))).toEqual(
        expectedResult,
      );
    });
  });

  describe('headerReducer', () => {
    let state;
    beforeEach(() => {
      state = {
        loading: false,
        hasLoadedOnce: false,
        model: null,
        error: false,
      };
    });

    it('should return the initial state', () => {
      const expectedResult = state;
      expect(headerReducer(undefined, {})).toEqual(expectedResult);
    });

    it('should handle the pendingLoadHeader action correctly', () => {
      const expectedResult = assign(state, { loading: true });
      expect(headerReducer(state, pendingLoadHeader())).toEqual(expectedResult);
    });

    it('should handle the headerLoaded action correctly', () => {
      const fixture = {
        region: 'mexico',
        session_stringvalue: 'QrXubyJqJ3',
      };
      const expectedResult = assign(state, {
        loading: false,
        model: fixture,
        hasLoadedOnce: true,
      });
      expect(headerReducer(state, headerLoaded(fixture))).toEqual(
        expectedResult,
      );
    });

    it('should handle the headerLoadingError action correctly', () => {
      const fixture = new Error('Something was wrong');
      const expectedResult = assign(state, { loading: false, error: true });

      expect(headerReducer(state, headerLoadingError(fixture))).toEqual(
        expectedResult,
      );
    });
  });
});
