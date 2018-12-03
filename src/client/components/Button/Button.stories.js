import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import LoaderReadme from './README.md';
import Button from './index';

storiesOf('Button', module)
  .addDecorator(withReadme(LoaderReadme))
  .add('- button', () => <Button />)
  .add('- text', () => <Button>Text!</Button>)
  .add('- loading', () => <Button loading>Loading</Button>)
  .add('- disabled', () => <Button disabled>Disabled</Button>)
  .add('- fluid', () => <Button fluid>Fluid</Button>)
  .add('- loading disabled', () => (
    <Button loading disabled>
      Loading
    </Button>
  ))
  .add('- click action', () => (
    <Button
      onClick={(e, props) => {
        const { children } = props;
        alert(`You have clicked on: '${children}' button`);
        /* const opcion = confirm(`You have clicked on: '${children}' button`);
        if (opcion) {
          console.log('Confirm has been clicked');
        } else {
          console.log('Cancel has been clicked');
        } */
      }}
    >
      Click on me!
    </Button>
  ));
