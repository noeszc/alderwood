import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import faker from 'faker';
import _ from 'lodash';

import SidebarReadme from './README.md';
import Sidebar from './index';
import Button from '../Button';

const Menu = () => (
  <ul>
    {_.range(6).map(v => (
      <li key={`li-${v}`}>{faker.hacker.verb()}</li>
    ))}
  </ul>
);
const Content = () => (
  <div>
    <h2>Headline</h2>
    {_.range(8).map(v => (
      <p key={`p-${v}`}>{faker.lorem.paragraph()}</p>
    ))}
  </div>
);

class SidebarSimple extends React.PureComponent {
  state = { visible: false };

  toggle = () => this.setState(({ visible }) => ({ visible: !visible }));

  render() {
    const { visible } = this.state;
    return (
      <div style={{ padding: '2vw' }}>
        <Button onClick={this.toggle}>{visible ? 'close' : 'open'}</Button>
        <Sidebar.Pushable>
          <Sidebar animation="overlay" visible={visible}>
            <Menu />
          </Sidebar>
          <Sidebar.Pusher>
            <Content />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

class SidebarDimmed extends React.PureComponent {
  state = { visible: false };

  toggle = () => this.setState(({ visible }) => ({ visible: !visible }));

  render() {
    const { visible } = this.state;
    return (
      <div style={{ padding: '2vw' }}>
        <Button onClick={this.toggle}>{visible ? 'close' : 'open'}</Button>
        <Sidebar.Pushable>
          <Sidebar animation="overlay" visible={visible}>
            <Menu />
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <Content />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

class SidebarTransition extends React.PureComponent {
  state = { visible: false, direction: 'left', animation: 'overlay' };

  toggle = () => this.setState(({ visible }) => ({ visible: !visible }));

  handleAnimationChange = animation => () =>
    this.setState(({ visible }) => ({ animation, visible: !visible }));

  handleDirectionChange = direction => () =>
    this.setState({ direction, visible: false });

  render() {
    const { visible, direction, animation } = this.state;
    return (
      <div style={{ padding: '2vw' }}>
        <div style={{ marginBottom: '2vh' }}>
          <h3>Direction</h3>
          <Button
            active={direction === 'left'}
            onClick={this.handleDirectionChange('left')}
          >
            left
          </Button>
          <Button
            active={direction === 'right'}
            onClick={this.handleDirectionChange('right')}
          >
            right
          </Button>
          <h3>Animation</h3>
          <Button onClick={this.handleAnimationChange('overlay')}>
            overlay
          </Button>
          <Button onClick={this.handleAnimationChange('push')}>push</Button>
        </div>
        <Sidebar.Pushable>
          <Sidebar
            animation={animation}
            direction={direction}
            visible={visible}
          >
            <Menu />
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <Content />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

storiesOf('Sidebar', module)
  .addDecorator(withReadme(SidebarReadme))
  .add('- simple', () => <SidebarSimple />)
  .add('- visible', () => (
    <div style={{ padding: '10vw 2vw' }}>
      <Sidebar.Pushable>
        <Sidebar animation="overlay" visible>
          <Menu />
        </Sidebar>
        <Sidebar.Pusher>
          <Content />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  ))
  .add('- dimmed', () => <SidebarDimmed />)
  .add('- transition', () => <SidebarTransition />);
