import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  getElementType,
  getUnhandledProps,
  childrenUtils,
  customPropTypes,
} from '../lib';
import { BEM } from '../lib/classNameBuilders';

/**
 * A pushable sub-component for Sidebar.
 */
const SidebarPusher = props => {
  const { children, content, dimmed, className } = props;

  const classes = cx(
    'pusher',
    BEM.useKeyOnly('pusher', dimmed, 'dimmed'),
    className,
  );
  const rest = getUnhandledProps(SidebarPusher, props);
  const ElementType = getElementType(SidebarPusher, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};

SidebarPusher.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Controls whether or not the dim is displayed. */
  dimmed: PropTypes.bool,
};

export default SidebarPusher;
