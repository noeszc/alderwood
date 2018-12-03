/**
 *
 * Modal
 * A modal displays content that temporarily blocks interactions with the main view of a site.
 */

import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'bem-classnames';

import {
  AutoControlledComponent as Component,
  childrenUtils,
  customPropTypes,
  doesNodeContainClick,
  eventStack,
  getElementType,
  getUnhandledProps,
  isBrowser,
} from '../lib';

import Icon from '../Icon';
import MountNode from '../MountNode';
import Portal from '../Portal';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalActions from './ModalActions';
import ModalDescription from './ModalDescription';
import Ref from '../Ref';
import './Modal.scss';

/* eslint-disable react/prefer-stateless-function */
class Modal extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Shorthand for Modal.Actions. Typically an array of button shorthand. */
    actions: customPropTypes.itemShorthand,

    /** A modal can reduce its complexity */
    basic: PropTypes.bool,
    /** A modal can be vertically centered in the viewport */
    centered: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for the close icon. Closes the modal on click. */
    closeIcon: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object,
      PropTypes.bool,
    ]),

    /** Whether or not the Modal should close when the dimmer is clicked. */
    closeOnDimmerClick: PropTypes.bool,

    /** Whether or not the Modal should close when the document is clicked. */
    closeOnDocumentClick: PropTypes.bool,

    /** Simple text content for the Modal. */
    content: customPropTypes.itemShorthand,

    /** Initial value of open. */
    defaultOpen: PropTypes.bool,

    /** A Modal can appear in a dimmer. */
    dimmer: PropTypes.bool,

    /** Event pool namespace that is used to handle component events */
    eventPool: PropTypes.string,

    /** Modal displayed above the content in bold. */
    header: customPropTypes.itemShorthand,

    /** The node where the modal should mount. Defaults to document.body. */
    mountNode: PropTypes.any,

    /**
     * Action onClick handler when using shorthand `actions`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onActionClick: PropTypes.func,

    /**
     * Called when a close event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClose: PropTypes.func,

    /**
     * Called when the portal is mounted on the DOM.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onMount: PropTypes.func,

    /**
     * Called when an open event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onOpen: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onUnmount: PropTypes.func,

    /** Controls whether or not the Modal is displayed. */
    open: PropTypes.bool,

    /** A modal can vary in size */
    size: PropTypes.oneOf(['fullscreen', 'large', 'mini', 'small', 'tiny']),

    /** Custom styles. */
    style: PropTypes.object,

    /** Element to be rendered in-place where the portal is defined. */
    trigger: PropTypes.node,
  };

  static defaultProps = {
    centered: true,
    dimmer: true,
    closeOnDimmerClick: true,
    closeOnDocumentClick: false,
    eventPool: 'Modal',
  };

  static autoControlledProps = ['open'];

  static Header = ModalHeader;

  static Content = ModalContent;

  static Description = ModalDescription;

  static Actions = ModalActions;

  componentWillUnmount() {
    this.handlePortalUnmount();
  }

  // Do not access document when server side rendering
  getMountNode = () =>
    isBrowser() ? this.props.mountNode || document.body : null;

  handleActionsOverrides = predefinedProps => ({
    onActionClick: (e, actionProps) => {
      _.invoke(predefinedProps, 'onActionClick', e, actionProps);
      _.invoke(this.props, 'onActionClick', e, this.props);

      this.handleClose();
    },
  });

  handleClose = e => {
    _.invoke(this.props, 'onClose', e, this.props);
    this.trySetState({ open: false });
  };

  handleDocumentClick = e => {
    const { closeOnDimmerClick } = this.props;
    if (!closeOnDimmerClick || doesNodeContainClick(this.ref, e)) return;

    _.invoke(this.props, 'onClose', e, this.props);
    this.trySetState({ open: false });
  };

  handleIconOverrides = predefinedProps => ({
    onClick: e => {
      _.invoke(predefinedProps, 'onClick', e);
      this.handleClose(e);
    },
  });

  handleOpen = e => {
    _.invoke(this.props, 'onOpen', e, this.props);
    this.trySetState({ open: true });
  };

  handlePortalMount = e => {
    const { eventPool } = this.props;

    this.setState({ scrolling: false });
    this.setPositionAndClassNames();

    eventStack.sub('click', this.handleDocumentClick, {
      pool: eventPool,
      target: this.dimmerRef,
    });

    _.invoke(this.props, 'onMount', e, this.props);
  };

  handlePortalUnmount = e => {
    const { eventPool } = this.props;

    cancelAnimationFrame(this.animationRequestId);
    eventStack.unsub('click', this.handleDocumentClick, {
      pool: eventPool,
      target: this.dimmerRef,
    });
    _.invoke(this.props, 'onUnmount', e, this.props);
  };

  handleRef = c => {
    this.ref = c;
  };

  handleDimmerRef = c => {
    this.dimmerRef = c;
  };

  setDimmerNodeStyle = () => {
    if (this.dimmerRef) {
      this.dimmerRef.style.setProperty('display', 'flex', 'important');
    }
  };

  setPositionAndClassNames = () => {
    const { dimmer } = this.props;
    let classes;

    if (dimmer) {
      classes = 'dimmed dimmed--dimmable';
    }

    const newState = {};

    if (this.ref) {
      const { height } = this.ref.getBoundingClientRect();

      const marginTop = null;
      const scrolling = height > window.innerHeight;
      if (this.state.marginTop !== marginTop) {
        newState.marginTop = marginTop;
      }

      if (this.state.scrolling !== scrolling) {
        newState.scrolling = scrolling;
      }

      if (scrolling) classes += ' dimmed--scrolling';
    }

    if (this.state.mountClasses !== classes) newState.mountClasses = classes;
    if (!_.isEmpty(newState)) this.setState(newState);

    this.animationRequestId = requestAnimationFrame(
      this.setPositionAndClassNames,
    );

    this.setDimmerNodeStyle();
  };

  renderContent = rest => {
    const {
      actions,
      basic,
      children,
      className,
      closeIcon,
      content,
      header,
      mountNode,
      size,
      style,
    } = this.props;

    const { marginTop, mountClasses, scrolling } = this.state;

    const classes = cx(
      {
        name: 'modal',
        modifiers: ['basic', 'scrolling', 'active', 'size'],
      },
      { scrolling, basic, active: true, size },
      className,
    );

    const ElementType = getElementType(Modal, this.props);

    const closeIconName = closeIcon === true ? 'times' : closeIcon;
    const closeIconJSX = Icon.create(closeIconName, {
      defaultProps: { className: 'modal__close' },
      overrideProps: this.handleIconOverrides,
    });

    if (!childrenUtils.isNil(children)) {
      return (
        <Ref innerRef={this.handleRef}>
          <ElementType
            {...rest}
            className={classes}
            style={{ marginTop, ...style }}
          >
            <MountNode className={mountClasses} node={mountNode} />
            {closeIconJSX}
            {children}
          </ElementType>
        </Ref>
      );
    }

    return (
      <Ref innerRef={this.handleRef}>
        <ElementType
          {...rest}
          className={classes}
          style={{ marginTop, ...style }}
        >
          <MountNode className={mountClasses} node={mountNode} />
          {closeIconJSX}
          {ModalHeader.create(header, { autoGenerateKey: false })}
          {ModalContent.create(content, { autoGenerateKey: false })}
          {ModalActions.create(actions, {
            overrideProps: this.handleActionsOverrides,
          })}
        </ElementType>
      </Ref>
    );
  };

  render() {
    const { open } = this.state;
    const { trigger, closeOnDocumentClick, eventPool, centered } = this.props;
    const mountNode = this.getMountNode();

    if (!isBrowser()) {
      return isValidElement(trigger) ? trigger : null;
    }

    const unhandled = getUnhandledProps(Modal, this.props);
    const portalPropNames = Portal.handledProps;

    const rest = _.reduce(
      unhandled,
      (acc, val, key) => {
        if (!_.includes(portalPropNames, key)) acc[key] = val;

        return acc;
      },
      {},
    );
    const portalProps = _.pick(unhandled, portalPropNames);

    // wrap dimmer modals
    const dimmerClasses = cx(
      {
        name: 'dimmer',
        modifiers: ['page', 'active'],
      },
      { page: true, active: true },
      !centered && 'dimmer--top-aligned',
    );

    return (
      <Portal
        closeOnDocumentClick={closeOnDocumentClick}
        {...portalProps}
        trigger={trigger}
        eventPool={eventPool}
        mountNode={mountNode}
        open={open}
        onClose={this.handleClose}
        onMount={this.handlePortalMount}
        onOpen={this.handleOpen}
        onUnmount={this.handlePortalUnmount}
      >
        <div className={dimmerClasses} ref={this.handleDimmerRef}>
          {this.renderContent(rest)}
        </div>
      </Portal>
    );
  }
}

export default Modal;
