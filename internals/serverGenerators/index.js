const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const routeGenerator = require('../serverGenerators/route');

module.exports = plop => {
  plop.setGenerator('route', routeGenerator);
  plop.addHelper('directory', comp => {
    try {
      fs.accessSync(
        path.join(__dirname, `../../src/server/routes/${comp}`),
        fs.F_OK,
      );
      return `routes/${comp}`;
    } catch (e) {
      return `routes/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../src/server/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**.js',
    )}`;
    console.log(folderPath);
    exec(`npm run prettify -- "${folderPath}"`);
    return folderPath;
  });
}
