import { createSelector } from 'reselect';
import get from 'lodash/get';

export const getAppState = state => get(state, 'app');

export const getAppReady = createSelector(
  [getAppState],
  appState => !get(appState, 'ready'),
);
