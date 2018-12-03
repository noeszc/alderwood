/**
 *
 * Loader
 * A loader alerts a user to wait for an activity to complete.
 * @see Dimmer
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'bem-classnames';
import _ from 'lodash';

import {
  getUnhandledProps,
  getElementType,
  childrenUtils,
  customPropTypes,
} from 'client/components/lib';
import { BEM } from 'client/components/lib/classNameBuilders';

import './Loader.scss';

const Loader = props => {
  const { children, content, inline, className } = props;

  const baseClasess = cx(
    {
      name: 'loader',
      modifiers: ['active', 'disabled', 'indeterminate', 'inverted'],
    },
    props,
    className,
  );

  const textClasses = BEM.useKeyOnly('loader', children || content, 'text');
  const inlineClasses = BEM.useKeyOrValueAndKey('loader', inline, 'inline');

  const classes = _.join(
    _.compact([baseClasess, inlineClasses, textClasses]),
    ' ',
  );

  const rest = getUnhandledProps(Loader, props);
  const ElementType = getElementType(Loader, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};

Loader.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A loader can be active or visible. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A loader can be disabled or hidden. */
  disabled: PropTypes.bool,

  /** A loader can show it's unsure of how long a task will take. */
  indeterminate: PropTypes.bool,

  /** Loaders can appear inline with content. */
  inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['centered'])]),

  /** Loaders can have their colors inverted. */
  inverted: PropTypes.bool,
};

export default Loader;
