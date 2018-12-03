import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import path from 'path';
import routes from 'server/routes/main.route';

export default function Server() {
  const server = express();
  let httpsServer;
  let httpServer;

  const create = function createFn(config) {
    const privateKey = fs.readFileSync(
      path.resolve(__dirname, 'cert/local/local.key'),
      'utf8',
    );
    const certificate = fs.readFileSync(
      path.resolve(__dirname, 'cert/local/local.crt'),
      'utf8',
    );
    const credentials = { key: privateKey, cert: certificate };
    const hbs = exphbs.create({
      extname: '.hbs',
      layoutsDir: path.resolve(__dirname, 'views/layouts'),
      partialsDir: path.resolve(__dirname, 'views/partials'),
      defaultLayout: 'main',
      helpers: {
        json: context => JSON.stringify(context),
      },
    });

    server.engine('.hbs', hbs.engine);
    server.set('views', path.resolve(__dirname, 'views'));
    // Server settings
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('portSSL', config.portSSL);
    server.set('hostname', config.hostname);
    server.set('view engine', '.hbs');

    // Returns middleware that parses json
    server.use(bodyParser.json());
    server.use('/dist', express.static(path.resolve(__dirname, '../../dist')));

    // Set up routes
    routes.init(server);
    httpsServer = https.createServer(credentials, server);
    httpServer = http.createServer(server);
  };

  const start = function startFn() {
    const hostname = server.get('hostname');
    const portSSL = server.get('portSSL');
    const port = server.get('port');

    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

    httpsServer.listen(portSSL);
    httpServer.listen(port);

    httpsServer.on('error', onError);
    httpServer.on('error', onError);

    httpsServer.on('listening', () => {
      console.log(
        `Express server listening on - https://${hostname}:${portSSL}`,
      );
    });
    httpServer.on('listening', () => {
      console.log(`Express server listening on - http://${hostname}:${port}`);
    });
  };

  return {
    create,
    start,
  };
}
