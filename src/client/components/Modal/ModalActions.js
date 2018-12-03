/**
 *
 * ModalActions
 * A modal can contain a row of actions.
 */
import _ from 'lodash';
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
import Button from '../Button';

class ModalActions extends React.Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Array of shorthand buttons. */
    actions: customPropTypes.collectionShorthand,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /**
     * Action onClick handler when using shorthand `actions`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props from the clicked action.
     */
    onActionClick: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.func,
    ]),
  };

  handleButtonOverrides = predefinedProps => ({
    onClick: (e, buttonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps);
      _.invoke(this.props, 'onActionClick', e, buttonProps);
    },
  });

  render() {
    const { actions, children, className, content } = this.props;
    const classes = cx({ name: 'modal__actions' }, this.props, className);

    const rest = getUnhandledProps(ModalActions, this.props);
    const ElementType = getElementType(ModalActions, this.props);

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

    return (
      <ElementType {...rest} className={classes}>
        {_.map(actions, action =>
          Button.create(action, { overrideProps: this.handleButtonOverrides }),
        )}
      </ElementType>
    );
  }
}

ModalActions.create = createShorthandFactory(ModalActions, actions => ({
  actions,
}));

export default ModalActions;
