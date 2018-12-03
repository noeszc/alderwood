import { getFrontConfig, getGtmConfig } from 'server/services/config.service';
import { getAkamaiDomain } from 'server/services/enviroment.service';

export const index = (req, res) => {
  const akamaiDomain = getAkamaiDomain(process.env.NODE_ENV);
  res.render('home', {
    reduxState: {
      config: getFrontConfig(),
    },
    akamaiDomain,
    gtm: getGtmConfig(),
  });
};

export default index;
