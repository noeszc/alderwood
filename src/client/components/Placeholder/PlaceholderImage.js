/**
 *
 * PlaceholderImage
 * A placeholder can contain an image..
 */

import React from 'react';
import cx from 'bem-classnames';
import PropTypes from 'prop-types';

import { customPropTypes, getUnhandledProps, getElementType } from '../lib';

const PlaceholderImage = props => {
  const { className } = props;

  const classes = cx(
    { name: 'placeholder__image', modifiers: ['rectangular', 'square'] },
    props,
    className,
  );

  const rest = getUnhandledProps(PlaceholderImage, props);
  const ElementType = getElementType(PlaceholderImage, props);

  return <ElementType {...rest} className={classes} />;
};

PlaceholderImage.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** An image can modify size correctly with responsive styles. */
  square: customPropTypes.every([
    customPropTypes.disallow(['rectangular']),
    PropTypes.bool,
  ]),

  /** An image can modify size correctly with responsive styles. */
  rectangular: customPropTypes.every([
    customPropTypes.disallow(['square']),
    PropTypes.bool,
  ]),
};

export default PlaceholderImage;
