import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import ActivityIndicator from 'client/components/ActivityIndicator';

const withLoading = WrappedComponent => {
  class Loader extends React.PureComponent {
    static propTypes = {
      loading: PropTypes.bool,
    };

    static WrappedComponent = WrappedComponent;

    static displayName = `withLoading(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    render() {
      const { loading } = this.props;
      if (loading) return <ActivityIndicator active={loading} />;
      return <WrappedComponent {...this.props} />;
    }
  }

  hoistNonReactStatics(Loader, WrappedComponent);

  return Loader;
};

export default withLoading;
