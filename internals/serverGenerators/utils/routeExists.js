const fs = require('fs');
const path = require('path');
const pageRoutes = fs.readdirSync(
  path.join(__dirname, '../../../src/server/routes'),
);

function routeExists(route) {
  return pageRoutes.indexOf(route) >= 0;
}

module.exports = routeExists;
