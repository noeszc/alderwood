import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';

import Dimmer from 'client/components/Dimmer';
import LoaderReadme from './README.md';
import Loader from './index';

storiesOf('Loader', module)
  .addDecorator(withReadme(LoaderReadme))
  .add('- dimmer', () => (
    <Dimmer active>
      <Loader />
    </Dimmer>
  ))
  .add('- text', () => (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  ))
  .add('- indeterminate', () => (
    <Dimmer active>
      <Loader indeterminate>Preparing files</Loader>
    </Dimmer>
  ))
  .add('- active', () => <Loader active />)
  .add('- inline', () => (
    <div style={{ position: 'relative', padding: '1rem 2rem' }}>
      <Loader active inline />
    </div>
  ))
  .add('- inline:centered', () => (
    <div style={{ position: 'relative', padding: '1rem 2rem' }}>
      <Loader active inline="centered" />
    </div>
  ));
