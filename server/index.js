const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const https = require('https');

const privateKey = fs.readFileSync(
  path.join(__dirname, `./ssl/server.key`),
  'utf8'
);

const certificate = fs.readFileSync(
  path.join(__dirname, `./ssl/server.crt`),
  'utf8'
);

const credentials = { key: privateKey, cert: certificate };

const express = require('express');
const session = require('express-session');

const cors = require('cors');
const logger = require('morgan');
const package = require('./package.json');

const routes = require('./routes');

const app = express();

app.use(logger('common'));

// Enable cors security headers
app.use(cors());

// session config
app.use(
  session({
    secret: process.env.SECRET || 'BSIqMSSPzT',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: process.env.COOKIE_EXPIRATION || 900000
    },
    rolling: true
  })
);

// add an express method to parse the POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const passport = require('passport');
app.use(passport.initialize());

// Load passport confid
require('./config/passport')(passport);

// persistent login sessions
app.use(passport.session());

// home page
app.get('/get', (req, res) => {
  const response = {
    api_version: package.version,
    message: 'Namaste'
  };
  res.send(response);
});

app.use('/', routes);

// app.listen('3001', () => {
//   console.log(`Server is running on port 3001`);
// });

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = error => {
  console.log({ error });
  if (error.syscall !== 'listen') {
    throw error;
  }

  const addr = httpsServer.address();
  console.log({ addr });
  const bind =
    typeof addr.httpsPort === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = httpsServer.address();
  // const bind =
  //   typeof addr === 'string'
  //     ? 'pipe ' + chalk.green(addr)
  //     : 'port ' + chalk.green(addr.port);
  console.log(
    chalk.yellow('-------------------NODE-SERVER-----------------------')
  );
  console.log(
    chalk.green('✔'),
    // chalk.bgYellow(chalk.black(`[${process.env.NODE_ENV}]`)),
    `Node Server running at:`,
    chalk.cyan(`https://localhost:${addr.port}`)
  );
};

const httpsPort = normalizePort(process.env.HTTPS_PORT || '3001');

app.set('port', httpsPort);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(httpsPort);
httpsServer.on('error', onError);
httpsServer.on('listening', onListening);
