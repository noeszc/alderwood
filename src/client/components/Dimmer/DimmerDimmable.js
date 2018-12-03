/**
 *
 * Dimmable
 * A dimmable sub-component for Dimmer
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'bem-classnames';

import {
  customPropTypes,
  childrenUtils,
  getUnhandledProps,
  getElementType,
} from 'client/components/lib';

const DimmerDimmable = props => {
  const { children, content, className } = props;

  const rest = getUnhandledProps(DimmerDimmable, props);
  const ElementType = getElementType(DimmerDimmable, props);
  const classes = cx(
    { name: 'dimmed', modifiers: ['dimmable'] },
    { dimmable: true },
    className,
  );
  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};

DimmerDimmable.propTypes = {
  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Controls whether or not the dim is displayed. */
  dimmed: PropTypes.bool,
};

export default DimmerDimmable;
