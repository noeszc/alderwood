/* eslint-disable jsx-a11y/alt-text */
/**
 *
 * Image
 * An image is a graphic representation of something.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'bem-classnames';

import {
  customPropTypes,
  createShorthandFactory,
  partitionHTMLProps,
  getElementType,
  childrenUtils,
  getUnhandledProps,
} from '../lib';
import { htmlImageProps } from '../lib/htmlPropsUtils';
import Dimmer from '../Dimmer';
import { BEM } from '../lib/classNameBuilders';

import './Image.scss';

const Image = props => {
  const {
    children,
    className,
    content,
    dimmer,
    floated,
    href,
    label,
    verticalAlign,
    wrapped,
  } = props;

  const classes = cx(
    {
      name: 'image',
      modifiers: [
        'avatar',
        'circular',
        'disabled',
        'fluid',
        'hidden',
        'inline',
      ],
    },
    props,
    BEM.useValueAndKey('image', floated, 'floated'),
    BEM.useVerticalAlignProp('image', verticalAlign),
    className,
  );

  const rest = getUnhandledProps(Image, props);
  const [imgTagProps, rootProps] = partitionHTMLProps(rest, {
    htmlProps: htmlImageProps,
  });

  const ElementType = getElementType(Image, props, () => {
    if (
      !_.isNil(dimmer) ||
      !_.isNil(label) ||
      !_.isNil(wrapped) ||
      !childrenUtils.isNil(children)
    ) {
      return 'div';
    }
  });

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes}>
        {content}
      </ElementType>
    );
  }

  if (ElementType === 'img') {
    return <ElementType {...rootProps} {...imgTagProps} className={classes} />;
  }
  return (
    <ElementType {...rootProps} href={href} className={classes}>
      {Dimmer.create(dimmer, { autoGenerateKey: false })}

      <img {...imgTagProps} />
    </ElementType>
  );
};

Image.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** An image may be formatted to appear inline with text as an avatar. */
  avatar: PropTypes.bool,

  /** An image may include a border to emphasize the edges of white or transparent content. */
  bordered: PropTypes.bool,

  /** An image can appear centered in a content block. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** An image may appear circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** An image can show that it is disabled and cannot be selected. */
  disabled: PropTypes.bool,

  /** Shorthand for Dimmer. */
  dimmer: customPropTypes.itemShorthand,

  /** An image can sit to the left or right of other content. */
  floated: PropTypes.oneOf(['left', 'right']),

  /** An image can take up the width of its container. */
  fluid: customPropTypes.every([
    PropTypes.bool,
    customPropTypes.disallow(['size']),
  ]),

  /** An image can be hidden. */
  hidden: PropTypes.bool,

  /** Renders the Image as an <a> tag with this href. */
  href: PropTypes.string,

  /** An image may appear inline. */
  inline: PropTypes.bool,

  /** Shorthand for Label. */
  label: customPropTypes.itemShorthand,

  /** An image can specify its vertical alignment. */
  verticalAlign: PropTypes.oneOf(['bottom', 'middle', 'top']),

  /** An image can render wrapped in a `div.image` as alternative HTML markup. */
  wrapped: PropTypes.bool,
};

Image.defaultProps = {
  as: 'img',
};

Image.create = createShorthandFactory(Image, value => ({ src: value }));

export default Image;
