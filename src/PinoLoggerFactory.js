import { performance } from 'perf_hooks';
import assert from 'assert';
import { pino } from 'pino';
import pinoPretty from 'pino-pretty';


// Helper function to time imports
async function timedImport(modulePath) {
  const start = performance.now();
  const module = await import(modulePath);
  const end = performance.now();
  console.log(`Importing '${modulePath}' took ${(end - start).toFixed(2)}ms`);
  return module;
}

export class PinoLoggerFactory {
  constructor(importMetaURL, tags = [], options = {}) {
    this.importMetaURL = importMetaURL;
    this.tags = tags;
    this.options = options;
  }

  async init(streamOrDestination, formatter = null) {
    try {

      if (!formatter) {
        throw new Error('Please provide a formatter function.');
      }

      const deps = await this.#loadDependencies();
      
      assert(typeof this.importMetaURL === 'string' && this.importMetaURL.startsWith('file:'), 'importMetaURL is required');

      const dirname = deps.getDirname(this.importMetaURL);
      const filename = deps.getFilename(this.importMetaURL);

      this._callerInfo = {
        filename,
        path: `${dirname}/${filename}`
      };

      const regexResult = dirname.match(/(packages(?:-[^/]+){0,1})(\/([^/]+))*/);
      if (regexResult) {
        this.pkgCollectionName = regexResult[1];
        this.pkgName = regexResult[0].split('/')[1];
        this.pkgTailPath = regexResult[0].split('/').slice(2).join('/');
        this._caller = `${this.pkgName}//${this.pkgTailPath}/${this._callerInfo.filename}`;
      }

      // const stream = pinoPretty({
      //   colorize: true,
      //   colorizeObjects: true,
      //   ignore: 'some'
      // });

      const options = {}

      const callerInfo = this._callerInfo;

      this.logger = pino({
        level: this.options.LOG_MODE || 'info',
        formatters: {
          //log: formatter(...obj)

          log: (logObj) => {

            const fullObj = { ...logObj, callerInfo: this._callerInfo }
            
            const finalObj = formatter(options)(fullObj)

            return finalObj
          }

          // log: (obj) => {
          //   return {
          //     ...obj,
          //     caller: this._caller
          //   };
          // }
        }
      }, streamOrDestination);
    } catch (error) {
      console.error('Error initializing logger:', error);
      throw error; // Re-throw to be handled by caller
    }
  }

  async #loadDependencies() {
    try {
      let ktrUtil;

      try {

        ktrUtil = await timedImport('ktr-util');

        // [
        //   { default: assert },
        //   { default: pino }, 
        //   { default: pinoPretty },
        // ] = await Promise.all([
        //   timedImport('assert'),
        //   timedImport('pino'),
        //   timedImport('pino-pretty'),
        // ]);
      } catch (err) {
          throw new Error(`Failed to load required dependencies: ${err.message}`);
      }

      // if (!assert || !pino || !pinoPretty || !ktrUtil) {
      //     throw new Error('One or more required dependencies failed to load');
      // }

      if (!ktrUtil) {
        throw new Error('One or more required dependencies failed to load');
      }

      console.log('Dependencies loaded successfully');

      let { flatten, getDirname, getFilename, getPackageName, getScopeName, walkUpAndFindOne } = ktrUtil;

      return {
        // assert,
        // pino,
        // pinoPretty,
        flatten,
        getDirname,
        getFilename,
        getPackageName,
        getScopeName,
        walkUpAndFindOne
      };
    } catch (error) {
      console.error('Error loading dependencies:', error);
      throw error; // Re-throw to be handled by caller
    }
  }

  info(loggableObj, ...args) {
    this.logger.info(loggableObj);
  }

  error(loggableObj, ...args) {
    this.logger.error(loggableObj); 
  }

  warn(loggableObj, ...args) {
    this.logger.warn(loggableObj);
  }

  debug(loggableObj, ...args) {
    this.logger.debug(loggableObj);
  }

  trace(loggableObj, ...args) {
    this.logger.trace(loggableObj);
  }

  fatal(loggableObj, ...args) {
    this.logger.fatal(loggableObj);
  }
}
