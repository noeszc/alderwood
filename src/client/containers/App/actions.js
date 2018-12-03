/*
 *
 * App actions
 *
 */

import { createAction } from 'redux-actions';
import {
  BOOTING,
  LOAD_HEADER,
  LOAD_CONFIG,
  UPDATE_CLIENT_CONFIG,
  LOAD_NAVIGATION,
  LOAD_SESSION,
  TELMEX_USER,
  LOAD_METADATA,
  LOAD_ASSETS,
} from './constants';

export const booting = createAction(BOOTING.ACTION);
export const bootingPending = createAction(BOOTING.PENDING);
export const finishedBooting = createAction(BOOTING.SUCCESS);
export const startupError = createAction(BOOTING.ERROR);

export const loadHeader = createAction(LOAD_HEADER.ACTION);
export const pendingLoadHeader = createAction(LOAD_HEADER.PENDING);
export const headerLoaded = createAction(LOAD_HEADER.SUCCESS);
export const headerLoadingError = createAction(LOAD_HEADER.ERROR);

export const loadConfig = createAction(LOAD_CONFIG.ACTION);
export const pendingLoadConfig = createAction(LOAD_CONFIG.PENDING);
export const configLoaded = createAction(LOAD_CONFIG.SUCCESS);
export const configLoadingError = createAction(LOAD_CONFIG.ERROR);

export const updateApaConfig = createAction(UPDATE_CLIENT_CONFIG.APA);
export const updateApiConfig = createAction(UPDATE_CLIENT_CONFIG.API);

export const loadNavigation = createAction(LOAD_NAVIGATION.ACTION);
export const pendingLoadNavigation = createAction(LOAD_NAVIGATION.PENDING);
export const navigationLoaded = createAction(LOAD_NAVIGATION.SUCCESS);
export const navigationLoadingError = createAction(LOAD_NAVIGATION.ERROR);

export const loadSession = createAction(LOAD_SESSION.ACTION);
export const pendingLoadSession = createAction(LOAD_SESSION.PENDING);
export const sessionLoaded = createAction(LOAD_SESSION.SUCCESS);
export const sessionLoadingError = createAction(LOAD_SESSION.ERROR);

export const loadMetadata = createAction(LOAD_METADATA.ACTION);
export const pendingLoadMetadata = createAction(LOAD_METADATA.PENDING);
export const metadataLoaded = createAction(LOAD_METADATA.SUCCESS);
export const metadataLoadingError = createAction(LOAD_METADATA.ERROR);

export const loadAssets = createAction(LOAD_ASSETS.ACTION);
export const pendingLoadAssets = createAction(LOAD_ASSETS.PENDING);
export const assetsLoaded = createAction(LOAD_ASSETS.SUCCESS);
export const assetsLoadingError = createAction(LOAD_ASSETS.ERROR);

export const telmexUserDetected = createAction(TELMEX_USER.ACTION);
