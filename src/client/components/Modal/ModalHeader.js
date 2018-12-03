/**
 *
 * ModalHeader
 * A modal can have a header
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'bem-classnames';

import {
  getUnhandledProps,
  getElementType,
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
} from '../lib';

const ModalHeader = props => {
  const { children, className, content } = props;
  const classes = cx({ name: 'modal__header' }, props, className);

  const rest = getUnhandledProps(ModalHeader, props);
  const ElementType = getElementType(ModalHeader, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};

ModalHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
};

ModalHeader.create = createShorthandFactory(ModalHeader, content => ({
  content,
}));

export default ModalHeader;
