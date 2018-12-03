/**
 *
 * ModalDescription
 * A modal can contain content.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'bem-classnames';

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
} from '../lib';

const ModalDescription = props => {
  const { children, className, content } = props;
  const classes = cx({ name: 'modal__description' }, props, className);

  const rest = getUnhandledProps(ModalDescription, props);
  const ElementType = getElementType(ModalDescription, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};

ModalDescription.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
};

export default ModalDescription;
