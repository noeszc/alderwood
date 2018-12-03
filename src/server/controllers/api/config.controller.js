import { each } from "lodash";
import { getLang, getSkin } from "server/services/enviroment.service";
import { getFooterDataReact } from "server/services/footerData.service";
import { setEdgeControl } from "server/services/webclient.service";
import config from "server/config/main.config";

export const getConfig = (req, res, next) => {
  const country = req.params.country;
  const assets_folder = config.paths.assets_folder;
  const entorno_microfwk = config.paths.url_dominio_microfwk;
  const entorno_microfwk_hbo = config.paths.url_dominio_microfwk_hbo;
  const entorno_dataprovider = config.paths.url_dominio_dataprovider;
  const origin = config.paths.url_dominio_webclient;
  const urlPlayer = config.paths.url_ficha_player;
  const api_params = config.general.api_params_default;
  const metrics = config.general.metrics;
  const start_header_info_params = "";
  const start_header_params = config["general"]["api_params_default"];

  const bodyAttributes = {
    metricasurchinaccount: "UA-20008251-1",
    metricassite: "telmexmexico",
    metricastagmanagernativeappaccount: "GTM-WGQNCK"
  };

  setEdgeControl("login");

  // Start Header Info: Params
  start_header_params["format"] = "jsonutf8";
  start_header_params["HKS"] = "";

  each(start_header_params, (param, key) => {
    start_header_info_params += `${key}=${param}&`;
  });
  start_header_info_params = `?${start_header_info_params.substr(
    0,
    start_header_info_params.length - 1
  )}`;

  res.status(200).json({
    api_version: api_params.api_version,
    app_key: config.general.app_key,
    authpn: api_params.authpn,
    authpt: api_params.authpt,
    assets_folder: assets_folder,
    assetsVersion: config.assetsVersion,
    body_attributes: bodyAttributes,
    cloak_enabled: true,
    config: config,
    end_point_apa: config.paths.end_point_apa,
    environment: $environment_current,
    // 'environment_object': $this->app->entorno,
    facebook_app_id: config.general.facebook_app_id,
    footer_data: getFooterDataReact(country),
    lang: getLang(),
    loginDirective: true,
    metrics: metrics,
    metricas: config.metricas,
    origin: origin,
    start_header_info_domain: config.paths.start_header_info_domain,
    start_header_info_params: start_header_info_params,
    skin: getSkin(),
    title: "Clarovideo",
    url_dominio_dataprovider: entorno_dataprovider,
    url_dominio_microfwk: entorno_microfwk,
    url_dominio_microfwk_hbo: entorno_microfwk_hbo,
    url_tagmanager: `${origin}fe/sitesplus/${country}/home/metricas/tagmanagerhandlerevent`,
    url_tagmanager_script: `${origin}fe/sitesplus/${country}/home/metricas/tagmanagerapi?layoutOff=true`,
    urlPlayer: urlPlayer,
    version: config.version
  });
};
