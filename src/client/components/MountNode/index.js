/**
 *
 * MountNode
 * A component that allows to manage classNames on a DOM node in declarative manner.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  NodeRegistry,
  getNodeFromProps,
  handleClassNamesChange,
  customPropTypes,
} from 'client/components/lib';

const nodeRegistry = new NodeRegistry();

/* eslint-disable react/prefer-stateless-function */
class MountNode extends React.Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    /** Additional classes. */
    className: PropTypes.string,

    /** The DOM node where we will apply class names. Defaults to document.body. */
    node: customPropTypes.domNode,
  };

  shouldComponentUpdate({ className: nextClassName }) {
    const { className: currentClassName } = this.props;

    return nextClassName !== currentClassName;
  }

  componentWillMount() {
    const node = getNodeFromProps(this.props);

    if (node) {
      nodeRegistry.add(node, this);
      nodeRegistry.emit(node, handleClassNamesChange);
    }
  }

  componentDidUpdate() {
    const node = getNodeFromProps(this.props);

    if (node) nodeRegistry.emit(node, handleClassNamesChange);
  }

  componentWillUnmount() {
    const node = getNodeFromProps(this.props);

    if (node) {
      nodeRegistry.del(node, this);
      nodeRegistry.emit(node, handleClassNamesChange);
    }
  }

  render() {
    return null;
  }
}

export default MountNode;
