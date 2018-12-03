const fs = require('fs');
const path = require('path');
const pageCtrls = fs.readdirSync(
  path.join(__dirname, '../../../src/server/controllers'),
);

function ctrlExists(route) {
  return pageCtrls.indexOf(route) >= 0;
}

module.exports = ctrlExists;
