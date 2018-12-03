/**
 * Vcard controller
 */
import { getCardData } from 'server/services/contentData.service';
import {
  getFrontConfig,
  getGtmConfig,
  getFacebookId,
} from 'server/services/config.service';
import { getAkamaiDomain } from 'server/services/enviroment.service';

export const index = (req, res) => {
  const { country, id } = req.params;
  const akamaiDomain = getAkamaiDomain(process.env.NODE_ENV);
  getCardData(country, id).then(cardData => {
    const facebookData = cardData;
    facebookData.facebookId = getFacebookId();
    res.render('home', {
      facebookData,
      reduxState: {
        config: getFrontConfig(),
      },
      akamaiDomain,
      gtm: getGtmConfig(),
    });
  });
};

export default index;
