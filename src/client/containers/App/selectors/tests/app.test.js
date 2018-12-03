import { getAppState, getAppReady } from '../app';

describe('getAppState', () => {
  it('should select the app state', () => {
    const state = {};
    const mockedState = {
      app: state,
    };

    expect(getAppState(mockedState)).toEqual(state);
  });
});

describe('getAppReady', () => {
  it('should select if the application is ready', () => {
    const isReady = true;
    const mockedState = {
      app: {
        ready: isReady,
      },
    };
    expect(getAppReady(mockedState)).toEqual(!isReady);
  });
});
