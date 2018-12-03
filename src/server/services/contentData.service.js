import Request from 'axios';
import get from 'lodash/get';
import {
  getDefaultParams,
  getMicrofwkHost,
} from 'server/services/config.service';

const path = 'services/content/data';

export function getContentData(region, groupId) {
  const defaultParams = getDefaultParams();
  const host = getMicrofwkHost();

  return Request.get(`${host}${path}`, {
    params: {
      ...defaultParams,
      region,
      group_id: groupId,
    },
  })
    .then(({ data }) => {
      if (data.response.group) {
        return data.response.group;
      }
      return {};
    })
    .catch(() => undefined);
}

export function getCardData(country, id) {
  return getContentData(country, id).then(group => {
    if (!group) return {};
    const cardData = {};
    const serie = get(group, 'common.extendedcommon.media.serie');
    if (serie) {
      cardData.title = `${serie.title}:${group.common.title}`;
    } else {
      cardData.title = group.common.title;
    }
    cardData.image_medium = group.common.image_medium;
    cardData.large_description = group.common.large_description;
    return cardData;
  });
}

export default {
  getContentData,
  getCardData,
};
