import fs from 'fs';

import { PinoLoggerFactory } from './PinoLoggerFactory.js'
import basicFormatter from './formatters/pino.basic.js'
import basicStringFormatter from './formatters/pino.basicString.js'
import flattenObjectFormatter from './formatters/pino.flattenObject.js'

export const pinoLoggerCreate = async (importMetaURL, options = {}) => {
  const { formatterType = null, destination = null, stream = null } = options;

  if (!stream && !destination) {
    throw new Error('Either stream or destination must be provided');
  }

  if (destination) {
    try {
      await fs.promises.access(destination);
    } catch (error) {
      throw new Error(`Destination file does not exist: ${destination}`);
    }
  }

  if (!formatterType) {
    throw new Error('Please provide a formatter function.');
  }

  let formatter;

  if (formatterType === 'basic') {
    formatter = basicFormatter;
  } else if (formatterType === 'basicString') {
    formatter = basicStringFormatter;
  } else if (formatterType === 'flattenObject') {
    formatter = flattenObjectFormatter;
  }

  const pinoLogger = new PinoLoggerFactory(importMetaURL);

  // Handle custom stream or destination
  if (stream) {
    await pinoLogger.init(stream, formatter); // Use the custom writable stream
  } else {
    await pinoLogger.init(destination, formatter); // Default to file destination
  }

  return pinoLogger;
};