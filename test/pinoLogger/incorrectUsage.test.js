import { Writable } from 'stream';
import chai from 'chai';
import { describe, it, before } from 'mocha';
import { pinoLoggerCreate } from '#src';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const expect = chai.expect;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MAX_TIMEOUT = 10000;


describe("Test incorrect usage of PinoLogger", function () {
  it("throws error when destination file doesn't exist", async function () {
    this.timeout(MAX_TIMEOUT);

    // Create logs directory if it doesn't exist
    const logsDir = path.join(__dirname, '../logs');
    if (!existsSync(logsDir)) {
      mkdirSync(logsDir, { recursive: true }); // Added recursive option
    }

    const nonExistentPath = path.join(__dirname, '../logs/non-existent-folder/test.log');

    try {
      await pinoLoggerCreate(import.meta.url, { 
        formatterType: 'basic', 
        destination: nonExistentPath 
      });
      // If we reach here, the test should fail
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.include('Destination file does not exist');
      expect(error.message).to.include(nonExistentPath);
    }
  });

  it("throws error when no formatter type is provided", async function() {
    this.timeout(MAX_TIMEOUT);

    // Create logs directory if it doesn't exist
    const logsDir = path.join(__dirname, '../logs');
    if (!existsSync(logsDir)) {
      mkdirSync(logsDir, { recursive: true });
    }

    // Create and ensure test.log exists first
    const logPath = path.join(__dirname, '../logs/test.log');
    writeFileSync(logPath, ''); // Create empty file
    
    try {
      await pinoLoggerCreate(import.meta.url, {
        destination: logPath
      });
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.include('Please provide a formatter function');
    }
  });

  it("throws error when neither stream nor destination is provided", async function() {
    this.timeout(MAX_TIMEOUT);
    
    try {
      await pinoLoggerCreate(import.meta.url, {
        formatterType: 'basic'
      });
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).to.be.an('error'); 
      expect(error.message).to.include('Either stream or destination must be provided');
    }
  });
});