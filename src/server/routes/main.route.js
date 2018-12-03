import countryRoute from 'server/routes/country/country.route';
import homeController from 'server/controllers/home.controller';
// import apiRoute from 'server/routes/api/main.api.route';

function init(server) {
  server.get('*', (req, res, next) => {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });

  server.get('/', homeController);

  server.use('/:country', countryRoute);
  // server.use('/error', errorRoute);
}

export default {
  init,
};
