/**
 *
 * ModalContent
 * A modal can contain content.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'bem-classnames';

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
} from '../lib';

const ModalContent = props => {
  const { children, className, content } = props;

  const classes = cx(
    { name: 'modal__content', modifiers: ['image', 'scrolling'] },
    props,
    className,
  );

  const rest = getUnhandledProps(ModalContent, props);
  const ElementType = getElementType(ModalContent, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};

ModalContent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A modal can contain image content. */
  image: PropTypes.bool,

  /** A modal can use the entire size of the screen. */
  scrolling: PropTypes.bool,
};

ModalContent.create = createShorthandFactory(ModalContent, content => ({
  content,
}));

export default ModalContent;
