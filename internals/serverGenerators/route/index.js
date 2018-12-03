const routeExists = require('../utils/routeExists');
const ctrlExists = require('../utils/ctrlExists');

module.exports = {
  description: 'Add a route',
  prompts: [
    {
      type: 'input',
      name: 'directoryName',
      message: 'Where should it be placed?',
      default: 'src/server/routes',
      validate: (value) => {
        return /.+/.test(value) || 'The directory name is required';
      },
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'my-route',
      validate: (value) => {
        if (/.+/.test(value)) {
          return routeExists(value)
            ? 'A route with this name already exists'
            : true;
        }
        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantAmainRoute',
      default: false,
      message: 'Do you want to a main route?',
    },
    {
      type: 'confirm',
      name: 'wantController',
      default: false,
      message: 'Do you want a controller route?',
    },
    {
      type: 'input',
      name: 'ctrlName',
      default: 'my-ctrl',
      message: 'What should it be called?',
      when: answer => answer.wantController,
      validate: (value) => {
        if (/.+/.test(value)) {
          return ctrlExists(value)
            ? 'A controller with this name already exists'
            : true;
        }
        return 'The name is required';
      },
    },
  ],
  actions: (data) => {
    const directory = data.directoryName;
    const actions = [
      {
        type: 'add',
        path: `../../${directory}/{{properCase name}}/{{properCase name}}.route.js`,
        templateFile: './route/route.js.hbs',
        abortOnFail: true,
      },
    ];

    if (data.wantAmainRoute) {
      actions.push({
        type: 'add',
        path: `../../${directory}/{{properCase name}}/main.route.js`,
        templateFile: './route/main.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantController) {
      actions.push({
        type: 'add',
        path: '../../src/server/controllers/{{properCase name}}/{{properCase name}}.controller.js',
        templateFile: './controller/controller.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/routes/',
    });

    return actions;
  }
}
