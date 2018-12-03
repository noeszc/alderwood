/**
 *
 * App
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import injectSaga from 'client/utils/injectSaga';
import withLoading from 'client/utils/withLoading';

import Header from 'client/components/Header';

import { getElementType } from 'client/components/lib';
import Sidebar from 'client/components/Sidebar';
import Button from 'client/components/Button';
import { getAppReady } from './selectors/app';
import saga from './saga';

class HomePage extends React.Component {
  state = { on: false };

  toggle = () => this.setState(({ on }) => ({ on: !on }));

  render() {
    const { on } = this.state;
    return (
      <div>
        <Button onClick={this.toggle}>{on ? 'close' : 'open'}</Button>
        <Sidebar.Pushable>
          <Sidebar animation="overlay" visible={on} direction="right">
            <span>foo</span>
            <span>bar</span>
            <span>baz</span>
          </Sidebar>
          <Sidebar.Pusher dimmed={on}>
            <h2>Home Page</h2>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

const TelmexPage = () => (
  <div>
    <h2>Telmex Landing Page</h2>
  </div>
);

const NotSupportedPage = () => (
  <div>
    <h2>Not Supported Page</h2>
  </div>
);

export const App = props => {
  const AppWrapper = getElementType(App, props);

  return (
    <AppWrapper className="wrapper">
      <Header />
      <Switch>
        <Route path="/:country/homeuser" component={HomePage} />
        <Route path="/:country/userdetectwsregister" component={TelmexPage} />
        <Route exact path="/not-supported" component={NotSupportedPage} />
      </Switch>
    </AppWrapper>
  );
};

App.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({
  loading: getAppReady(state),
});

const withConnect = connect(mapStateToProps);

const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withRouter,
  withSaga,
  withConnect,
  withLoading,
)(App);
