import axios from 'axios';

const api = axios.create();

const getNavigation = () =>
  api.get('services/nav/data').then(({ data }) => data);

const getSession = () =>
  api.get('services/user/isloggedin').then(({ data }) => data);

export default api;
export { getNavigation, getSession };
