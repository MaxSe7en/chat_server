// utils/logger.js
import { createLogger, format, transports } from 'winston';
import path from 'path';

// Define the custom log format
const customFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: 'info', // Log only if info level or higher
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }), // Include stack trace
    customFormat
  ),
  transports: [
    // Write all logs with level `info` and below to `combined.log`
    new transports.File({ filename: path.join('logs', 'combined.log'), level: 'info' }),
    // Write all logs with level `error` and below to `error.log`
    new transports.File({ filename: path.join('logs', 'error.log'), level: 'error' }),
  ],
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      customFormat
    )
  }));
}

export default logger;
