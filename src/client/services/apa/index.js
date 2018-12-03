import axios from 'axios';

const apa = axios.create();

const getHKSToken = params =>
  apa.get('services/user/startheaderinfo', { params }).then(({ data }) => data);

const getMetadata = params =>
  apa.get('services/apa/metadata', { params }).then(({ data }) => data);

const getAssets = params =>
  apa.get('services/apa/asset', { params }).then(({ data }) => data);

export default apa;
export { getHKSToken, getMetadata, getAssets };
