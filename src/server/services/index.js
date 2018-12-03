import server from './server';
import config from './configs';

const iServer = server();

iServer.create(config);
iServer.start();
