import { merge } from 'lodash';
import mGlobal from 'server/config/global'
import development from 'server/config/development';
import test from 'server/config/test';
import preprod from 'server/config/pre-prod';

function getEnv() {
  const env = process.env.NODE_ENV || 'development';
  switch (env) {
  case 'preprod':
    return preprod;
  case 'test':
    return test;
  case 'development':
  default:
    return development;
  }
}

const defaultConfig = {
  ...getEnv(),
};

export default merge(mGlobal, defaultConfig);