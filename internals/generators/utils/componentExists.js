const fs = require('fs');
const path = require('path');
const pageComponents = fs.readdirSync(
  path.join(__dirname, '../../../src/client/components'),
);
const pageContainers = fs.readdirSync(
  path.join(__dirname, '../../../src/client/containers'),
);
const components = pageComponents.concat(pageContainers);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
