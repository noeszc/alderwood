/**
 *
 * PlaceholderLine
 * A placeholder can contain have lines of text.
 */

import React from 'react';
import cx from 'bem-classnames';
import PropTypes from 'prop-types';

import { customPropTypes, getUnhandledProps, getElementType } from '../lib';

const PlaceholderLine = props => {
  const { className } = props;

  const classes = cx(
    { name: 'placeholder__line', modifiers: ['length'] },
    props,
    className,
  );

  const rest = getUnhandledProps(PlaceholderLine, props);
  const ElementType = getElementType(PlaceholderLine, props);

  return <ElementType {...rest} className={classes} />;
};

PlaceholderLine.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** A line can specify how long its contents should appear. */
  length: PropTypes.oneOf([
    'full',
    'very-long',
    'long',
    'medium',
    'short',
    'very-short',
  ]),
};

export default PlaceholderLine;
