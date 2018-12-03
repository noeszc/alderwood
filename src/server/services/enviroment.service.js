import config from 'server/config/main.config';

export function getLang(region) {
  return config.regions.region[region].lang
    ? config.regions.region[region].lang
    : config.regions.region_default_lang;
}
export function getSkin(region) {
  return config.regions.region[region].skin
    ? config.regions.region[region].skin
    : config.regions.region_default_skin;
}

export function getAkamaiDomainTest() {
  /* TEST http://testxuicdn0-a.akamaihd-staging.net */
  return '';
}

export function getAkamaiDomainProd() {
  /* PROD https://clarovideocdn0-a.akamaihd.net */
  const number = Math.floor(Math.random() * 10);
  return `https://clarovideocdn${number}-a.akamaihd.net`;
}

export function getAkamaiDomain(environment) {
  return environment === 'production'
    ? getAkamaiDomainProd()
    : getAkamaiDomainTest();
}
