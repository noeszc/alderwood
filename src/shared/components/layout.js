import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import routes from 'shared/routes/routes.shared';
import { updateStartMetadata } from 'shared/redux/sagas/root.saga'

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Claro Video',
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <Switch>
          {routes.map(route => <Route key={route.path} {...route} />)}
        </Switch>
        <Helmet>
          <title>Contact Page</title>
          <meta name="description" content="This is a proof of concept for React SSR" />
        </Helmet>
      </div>
    );
  }
}

Layout.fetchData = updateStartMetadata;

export default Layout;
