import { createSelector } from 'reselect';
import get from 'lodash/get';
import { getAppState } from './app';

export const getNavigationState = createSelector([getAppState], app =>
  get(app, 'navigation'),
);
