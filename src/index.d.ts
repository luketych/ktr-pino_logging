declare module 'ktr-pino_logging' {
  // Formatter Type Options
  export type FormatterType = 'basic' | 'basicString' | 'flattenObject';

  // Options for pinoLoggerCreate
  export interface LoggerOptions {
    formatterType: FormatterType; // Specifies the type of formatter
    destination?: string | null; // File path for logging
    stream?: Writable | null;    // Custom writable stream
  }

  // Main function to create a logger
  export function pinoLoggerCreate(
    importMetaURL: string,
    options?: LoggerOptions
  ): Promise<PinoLoggerFactory>;

  // Class representing the Logger Factory
  export class PinoLoggerFactory {
    constructor(importMetaURL: string);

    init(
      output: string | Writable, // File path or writable stream
      formatter: (log: object) => object
    ): Promise<void>;
  }

  // Formatter functions
  export const basicFormatter: (log: object) => object;
  export const basicStringFormatter: (log: object) => string;
  export const flattenObjectFormatter: (log: object) => object;
}
