import Request from 'axios';

export default function getApaMetadataFromAPI(config) {
  const path = 'services/apa/metadata';
  return Request.get(`${config.host}${path}`, {
    params: {
      sessionKey: config.sessionKey,
      ...config.paramsDefault,
    },
  });
}
