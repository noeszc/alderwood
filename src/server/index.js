import server from 'server/server';
import config from 'server/config/main.config';

const mServer = server();

mServer.create(config);
mServer.start();