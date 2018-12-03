import config from 'server/config/main.config';

export function getDefaultParams() {
  return config.general.api_params_default;
}

export function getMicrofwkHost() {
  return config.paths.url_dominio_microfwk;
}

export function getFacebookId() {
  return config.general.facebook_app_id;
}

export function getFrontConfig() {
  return {
    apiParamsDefault: config.general.api_params_default,
    appKey: config.general.app_key,
    apiVersion: config.paths.api_version,
    paths: {
      microfwkDomain: config.paths.url_dominio_microfwk,
      apaDomain: config.paths.end_point_apa,
      startHeaderInfoDomain: config.paths.start_header_info_domain,
    },
  };
}

export function getGtmConfig() {
  return config.general.metrics.google.tag_manager.GTM;
}

export default {
  getDefaultParams,
};
