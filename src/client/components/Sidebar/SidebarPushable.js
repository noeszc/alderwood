import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  getUnhandledProps,
  getElementType,
  childrenUtils,
  customPropTypes,
} from '../lib';

const SidebarPushable = props => {
  const { children, content, className } = props;
  const classes = cx('pushable', className);
  const rest = getUnhandledProps(SidebarPushable, props);
  const ElementType = getElementType(SidebarPushable, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};

SidebarPushable.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
};

export default SidebarPushable;
