module.exports = {
    dtStrType: 'dateTime',
    type: 'basic',
    consoleOrFile: 'both',
    fileName: 'main.log',
    LOG_MODE: 'info',
    label: 'pinoLogger',
    HDR_LEN: 18,
    colors: {
      primary: '#0096c7',
      secondary: '#5c7aff',
      tertiary: '#007ea7',
      
      debug: '#FFA500',
      info: '#D9E6FF',
      warn: '#E1D446',
      error: '#F77'
    },
    messageLength: undefined, // Set your default message length here
    delimiter: ' ',
    outputStream: process.stdout
}