import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

let dir = path.join(__dirname, '..', '..', 'logs');
if (!dir) {
  dir = path.resolve('logs');
}
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const options = {
  file: {
    level: 'silly',
    filename: dir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: '14d',
  },
};

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'silly',
      format: format.combine(format.colorize(), format.simple(), format.errors({ stack: true })),
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false,
});

export default logger;
