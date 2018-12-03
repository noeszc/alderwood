/**
 *
 * Placeholder
 *
 */

import React from 'react';
import cx from 'bem-classnames';
import PropTypes from 'prop-types';

import {
  customPropTypes,
  getUnhandledProps,
  getElementType,
  childrenUtils,
} from '../lib';

import './Placeholder.scss';
import PlaceholderLine from './PlaceholderLine';
import PlaceholderImage from './PlaceholderImage';

const Placeholder = props => {
  const { content, children, className } = props;
  const classes = cx(
    { name: 'placeholder', modifiers: ['fluid'] },
    props,
    className,
  );

  const rest = getUnhandledProps(Placeholder, props);
  const ElementType = getElementType(Placeholder, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};

Placeholder.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A fluid placeholder takes up the width of its container. */
  fluid: PropTypes.bool,
};

Placeholder.Image = PlaceholderImage;
Placeholder.Line = PlaceholderLine;

export default Placeholder;
