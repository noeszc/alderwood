import React from 'react';
import { mount } from 'enzyme';
import ModalActions from '../ModalActions';

describe('ModalActions', () => {
  const actions = [
    { key: 'cancel', content: 'Cancel', 'data-foo': 'something' },
    { key: 'ok', content: 'OK', 'data-foo': 'something' },
  ];

  describe('actions', () => {
    const buttons = mount(<ModalActions actions={actions} />).find('Button');

    it('renders children', () => {
      expect(buttons.at(0).prop('content')).toEqual('Cancel');
      expect(buttons.at(1).prop('content')).toEqual('OK');
    });

    it('passes arbitrary props', () => {
      buttons.everyWhere(action =>
        expect(action.prop('data-foo')).toEqual('something'),
      );
    });
  });

  describe('onActionClick', () => {
    it('can be omitted', () => {
      const click = () =>
        mount(<ModalActions actions={actions} />)
          .find('Button')
          .first()
          .simulate('click');

      expect(click).not.toThrow();
    });

    it('is called with (e, actionProps) when clicked', () => {
      const event = { target: null };
      const onActionClick = jest.fn();
      const onButtonClick = jest.fn();

      const action = {
        key: 'users',
        content: 'Disable',
        onClick: onButtonClick,
      };

      mount(
        <ModalActions
          actions={[...actions, action]}
          onActionClick={onActionClick}
        />,
      )
        .find('Button')
        .last()
        .simulate('click', event);

      expect(onActionClick).toBeCalledTimes(1);
      expect(onButtonClick).toBeCalledTimes(1);
    });
  });
});
