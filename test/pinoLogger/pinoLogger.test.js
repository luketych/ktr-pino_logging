import { Writable } from 'stream';
import chai from 'chai';
import { describe, it, before } from 'mocha';
import { pinoLoggerCreate } from '#src';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';

const expect = chai.expect;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MAX_TIMEOUT = 10000;

describe("PinoLogger Formatter Tests", function () {
  let basicPinoStreamLogger, basicPinoFileLogger, basicStringPinoStreamLogger, basicStringPinoFileLogger, flattenObjectPinoStreamLogger, flattenObjectPinoFileLogger, logs;

  before(async function () {
    this.timeout(MAX_TIMEOUT);
  
    // Ensure log directory exists
    const logDir = path.resolve(__dirname, '../logs');
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }

    // create log files: basic.log, basicString.log, flatten.log
    await fs.writeFile(path.join(logDir, 'basic.log'), '');
    await fs.writeFile(path.join(logDir, 'basicString.log'), '');
    await fs.writeFile(path.join(logDir, 'flatten.log'), '');
  
    // Initialize logs array
    logs = [];
  
    // Create custom writable stream
    const logStream = new Writable({
      write(chunk, encoding, callback) {
        console.log('Stream received chunk:', chunk.toString());
        try {
          const parsed = JSON.parse(chunk.toString());
          logs.push(parsed);
        } catch (err) {
          console.error('Parse error:', err);
          console.error('Raw chunk:', chunk.toString());
        }
        callback();
      },
    });
    
    basicPinoStreamLogger = await pinoLoggerCreate(import.meta.url, { formatterType: 'basic', stream: logStream });
    basicPinoFileLogger = await pinoLoggerCreate(import.meta.url, { formatterType: 'basic', destination: path.join(logDir, 'basic.log') });

    basicStringPinoStreamLogger = await pinoLoggerCreate(import.meta.url, { formatterType: 'basicString', stream: logStream });
    basicStringPinoFileLogger = await pinoLoggerCreate(import.meta.url, { formatterType: 'basicString', destination: path.join(logDir, 'basicString.log') });

    flattenObjectPinoStreamLogger = await pinoLoggerCreate(import.meta.url, { formatterType: 'flattenObject', stream: logStream });
    flattenObjectPinoFileLogger = await pinoLoggerCreate(import.meta.url, { formatterType: 'flattenObject', destination: path.join(logDir, 'flatten.log') });
  
    console.log('Loggers created.');
  });

  describe("Basic Formatter Tests", function () {
    it("tests the basic formatter.", async function () {
      this.timeout(MAX_TIMEOUT);

      // Clear logs before test
      logs = [];

      // Log a test message
      basicPinoStreamLogger.info({
        msg: "This is a test message.",
      });

      // Wait longer for logs to flush
      await new Promise((resolve) => setTimeout(resolve, 500));
      expect(logs.length).to.be.greaterThan(0, 'No logs were captured');

      // Assert directly on the parsed log message
      const loggedMessage = logs[0];
      expect(loggedMessage.msg).to.equal("This is a test message.");
      expect(loggedMessage.level).to.equal(30); // 30 is the level for "info"
    });

    it("tests basic formatter logging to a file.", async function () {
      this.timeout(MAX_TIMEOUT);
    
      const logFilePath = path.resolve(__dirname, '../logs/basic.log');
    
      // Log a message
      basicPinoFileLogger.info({
        msg: "File test message.",
      });
    
      // Wait for logs to flush
      await new Promise((resolve) => setTimeout(resolve, 500));
    
      // Read the log file content
      const logContent = await fs.readFile(logFilePath, 'utf8');
      const logLines = logContent.split('\n').filter((line) => line); // Remove empty lines
      expect(logLines.length).to.be.greaterThan(0, 'No logs were captured in the file');
    
      // Validate the first log entry
      const loggedMessage = JSON.parse(logLines[0]);
      expect(loggedMessage.msg).to.equal("File test message.");
      expect(loggedMessage.level).to.equal(30); // 30 is the level for "info"
    });
  });

  describe("Basic String Formatter Tests", function () {
    it("tests the basicString formatter.", async function () {
      this.timeout(MAX_TIMEOUT);

      // Clear logs before test
      logs = [];

      // Log a test message
      basicStringPinoStreamLogger.info({
        msg: "This is a test message.",
      });

      // Wait longer for logs to flush
      await new Promise((resolve) => setTimeout(resolve, 500));
      expect(logs.length).to.be.greaterThan(0, 'No logs were captured');

      const loggedMessage = logs[0];
      const parsedLoggableString = JSON.parse(loggedMessage.loggableString.replace(/\u001b\[\d+m/g, ''));
      expect(parsedLoggableString).to.deep.include({msg: "This is a test message."});
      expect(loggedMessage.level).to.equal(30);
    });

    it("tests the basicString formatter with a structured object.", async function () {
      this.timeout(MAX_TIMEOUT);

      // Clear logs before test
      logs = [];

      // Log a structured object
      basicStringPinoStreamLogger.info({
        structuredObj: {
          foo: "bar",
        },
      });

      // Wait longer for logs to flush
      await new Promise((resolve) => setTimeout(resolve, 500));
      expect(logs.length).to.be.greaterThan(0, 'No logs were captured');

      const loggedMessage = logs[0];
      const parsedLoggableString = JSON.parse(loggedMessage.loggableString.replace(/\u001b\[\d+m/g, ''));
      expect(parsedLoggableString).to.deep.include({
        structuredObj: {
          foo: "bar"
        }
      });
      expect(loggedMessage.level).to.equal(30);
    });

    it("tests basicString formatter logging to a file.", async function () {
      this.timeout(MAX_TIMEOUT);
    
      const logFilePath = path.resolve(__dirname, '../logs/basicString.log');
    
      // Log a message
      basicStringPinoFileLogger.info({
        msg: "File test message.",
      });
    
      // Wait for logs to flush
      await new Promise((resolve) => setTimeout(resolve, 500));
    
      // Read the log file content
      const logContent = await fs.readFile(logFilePath, 'utf8');
      const logLines = logContent.split('\n').filter((line) => line);
      expect(logLines.length).to.be.greaterThan(0, 'No logs were captured in the file');
    
      const loggedMessage = JSON.parse(logLines[0]);
      const parsedLoggableString = JSON.parse(loggedMessage.loggableString.replace(/\u001b\[\d+m/g, ''));
      expect(parsedLoggableString.msg).to.equal("File test message.");
      expect(loggedMessage.level).to.equal(30);
    });
  });

  describe("Flatten Object Formatter Tests", function () {
    it("tests the flattenObject formatter with nested objects", async function () {
      this.timeout(MAX_TIMEOUT);

      // Clear logs before test
      logs = [];

      // Log a nested object
      flattenObjectPinoStreamLogger.info({
        user: {
          details: {
            name: "John",
            age: 30
          },
          preferences: {
            theme: "dark"
          }
        }
      });

      // Wait longer for logs to flush
      await new Promise((resolve) => setTimeout(resolve, 500));
      expect(logs.length).to.be.greaterThan(0, 'No logs were captured');

      const loggedMessage = logs[0];
      expect(loggedMessage).to.have.property('user__details__name', 'John');
      expect(loggedMessage).to.have.property('user__details__age', 30);
      expect(loggedMessage).to.have.property('user__preferences__theme', 'dark');
      expect(loggedMessage.level).to.equal(30);
    });
  });

  after(async function () {
    this.timeout(MAX_TIMEOUT);

    const logFiles = ['basic.log', 'basicString.log', 'flatten.log'];
    
    for (const file of logFiles) {
      const logFilePath = path.resolve(__dirname, '../logs', file);
      if (existsSync(logFilePath)) {
        await fs.unlink(logFilePath);
      }
    }
  });
});