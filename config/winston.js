const {transports, createLogger, format} = require('winston');
var appRoot = require('app-root-path');

var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: true
  },
}
const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ]
});

module.exports = logger;