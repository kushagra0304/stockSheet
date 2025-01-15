const { default: mongoose } = require('mongoose');
const morgan = require('morgan');

// This one logs any request made to the server
// One important thing to note. it only logs those request which have a response.
// No response indicates server error.
const morganRequestLogger = morgan((tokens, req, res) => {
    if (tokens.method(req, res) === 'POST') {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body),
      ].join(' ');
    }
  
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
    ].join(' ');
})

const handleDataBaseConnection = (request, response, next) => {
  if (mongoose.connection.readyState !== 1) {
    response.status(503).json({
      error: 'Database not connected',
    });
  } else {
    // It's important next() is called inside this else block.
    // Because we need to end the request-response cycle.
    next();
  }
};

const errorHandler = (error, request, response, next) => {
  console.error(error);
  response.status(500).json({
    error: {
      name: error.name,
      message: error.message
    }
  });
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  morganRequestLogger,
  handleDataBaseConnection,
  errorHandler,
  unknownEndpoint
}