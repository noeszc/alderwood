/**
 *
 * Dimmer
 * A dimmer hides distractions to focus attention on particular content.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  getUnhandledProps,
  createShorthandFactory,
} from 'client/components/lib';
import Portal from 'client/components/Portal';

import DimmerDimmable from 'client/components/Dimmer/DimmerDimmable';
import DimmerInner from 'client/components/Dimmer/DimmerInner';

import './Dimmer.scss';

/* eslint-disable react/prefer-stateless-function */
class Dimmer extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    page: PropTypes.bool,
  };

  static Dimmable = DimmerDimmable;

  static Inner = DimmerInner;

  handlePortalMount = () => {
    document.body.classList.add('dimmed');
    document.body.classList.add('dimmed--dimmable');
  };

  handlePortalUnmount = () => {
    document.body.classList.remove('dimmed');
    document.body.classList.remove('dimmed--dimmable');
  };

  render() {
    const { active, page } = this.props;
    const rest = getUnhandledProps(Dimmer, this.props);

    if (page) {
      return (
        <Portal
          closeOnEscape={false}
          closeOnDocumentClick={false}
          onMount={this.handlePortalMount}
          onUnmount={this.handlePortalUnmount}
          open={active}
          openOnTriggerClick={false}
        >
          <DimmerInner {...rest} active={active} page={page} />
        </Portal>
      );
    }

    return <DimmerInner {...rest} active={active} page={page} />;
  }
}

Dimmer.create = createShorthandFactory(Dimmer, value => ({ content: value }));

export default Dimmer;
