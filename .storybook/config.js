import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

import 'sanitize.css/sanitize.css';

setOptions({
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
});

const req = require.context('../src/client/', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(file => req(file));
}

configure(loadStories, module);
