/**
 *
 * Icon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';

import {
  customPropTypes,
  getUnhandledProps,
  getElementType,
  createShorthandFactory,
} from 'client/components/lib';

import { useKeyOnly } from 'client/components/lib/classNameBuilders';

/* eslint-disable react/prefer-stateless-function */
class Icon extends React.Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** Icon can boredered. */
    border: PropTypes.bool,

    /** Name of the icon. */
    name: PropTypes.string,

    /** Icon can flipped. */
    flip: PropTypes.oneOf(['horizontal', 'vertical', 'both']),

    /** Icon can rotated. */
    rotation: PropTypes.oneOf([90, 180, 270]),

    /** Size of the icon. */
    size: PropTypes.oneOf([
      'lg',
      'xs',
      'sm',
      '1x',
      '2x',
      '3x',
      '4x',
      '5x',
      '6x',
      '7x',
      '8x',
      '9x',
      '10x',
    ]),

    /** Icon can spin. */
    spin: PropTypes.bool,

    /** Icon can pulled. */
    pull: PropTypes.oneOf(['right', 'left']),

    /** Animating */
    pulse: PropTypes.bool,

    /** Icon can fixed width. */
    fixedWidth: PropTypes.bool,

    /** Icons in a List */
    listItem: PropTypes.bool,

    /** Icon can have an aria label. */
    'aria-hidden': PropTypes.string,

    /** Icon can have an aria label. */
    'aria-label': PropTypes.string,
  };

  static defaultProps = {
    as: 'i',
  };

  getIconAriaOptions() {
    const ariaOptions = {};
    const { 'aria-label': ariaLabel, 'aria-hidden': ariaHidden } = this.props;

    if (_.isNil(ariaLabel)) {
      ariaOptions['aria-hidden'] = 'true';
    } else {
      ariaOptions['aria-label'] = ariaLabel;
    }

    if (!_.isNil(ariaHidden)) {
      ariaOptions['aria-hidden'] = ariaHidden;
    }

    return ariaOptions;
  }

  render() {
    const {
      spin,
      pulse,
      fixedWidth,
      border,
      listItem,
      flip,
      size,
      rotation,
      pull,
      name,
      className,
    } = this.props;

    const classes = cx(
      'icon',
      'fa',
      `fa-${name}`,
      useKeyOnly(spin, 'fa-spin'),
      useKeyOnly(pulse, 'fa-pulse'),
      useKeyOnly(fixedWidth, 'fa-fw'),
      useKeyOnly(border, 'fa-border'),
      useKeyOnly(listItem, 'fa-li'),
      {
        'fa-flip-horizontal': flip === 'horizontal' || flip === 'both',
        'fa-flip-vertical': flip === 'vertical' || flip === 'both',
      },
      useKeyOnly(size, `fa-${size}`),
      useKeyOnly(rotation, `fa-rotate-${rotation}`),
      useKeyOnly(pull, `fa-pull-${pull}`),
      className,
    );

    const rest = getUnhandledProps(Icon, this.props);
    const ElementType = getElementType(Icon, this.props);
    const ariaOptions = this.getIconAriaOptions();

    return <ElementType {...rest} {...ariaOptions} className={classes} />;
  }
}

Icon.create = createShorthandFactory(Icon, value => ({ name: value }));

export default Icon;
