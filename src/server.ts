import app from './app';
import dotenv from 'dotenv';
import http from 'http';

const debug = require('debug')('whatsapp-clone-app:server');

// Port implementation

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '3050');

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

