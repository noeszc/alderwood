/*
 *
 * App constants
 *
 */

import { defineAction } from 'redux-define';

const CANCELLED = 'CANCELLED';
const ERROR = 'ERROR';
const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';

export const BOOTING = defineAction(
  'BOOTING',
  [CANCELLED, ERROR, PENDING, SUCCESS],
  'claro/App',
);

export const LOAD_CONFIG = defineAction(
  'LOAD_CONFIG',
  [CANCELLED, ERROR, PENDING, SUCCESS],
  'claro/App',
);

export const UPDATE_CLIENT_CONFIG = defineAction(
  'UPDATE_CLIENT_CONFIG',
  ['APA', 'API'],
  'claro/App',
);

export const LOAD_HEADER = defineAction(
  'LOAD_HEADER',
  [CANCELLED, ERROR, PENDING, SUCCESS],
  'claro/App',
);

export const LOAD_NAVIGATION = defineAction(
  'LOAD_NAVIGATION',
  [CANCELLED, ERROR, PENDING, SUCCESS],
  'claro/App',
);

export const LOAD_SESSION = defineAction(
  'LOAD_SESSION',
  [CANCELLED, ERROR, PENDING, SUCCESS],
  'claro/App',
);

export const LOAD_METADATA = defineAction(
  'LOAD_METADATA',
  [CANCELLED, ERROR, PENDING, SUCCESS],
  'claro/App',
);

export const LOAD_ASSETS = defineAction(
  'LOAD_ASSETS',
  [CANCELLED, ERROR, PENDING, SUCCESS],
  'claro/App',
);

export const TELMEX_USER = defineAction('TELMEX_USER', [], 'claro/App');
