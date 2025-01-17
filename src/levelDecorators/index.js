import pinoDebug from './pino.debug.js'
import pinoError from './pino.error.js'
import pinoInfo from './pino.info.js'
import pinoWarn from './pino.warn.js'


const pino = {
    debug: pinoDebug,
    error: pinoError,
    info: pinoInfo,
    warn: pinoWarn
}


export {
    pino as pinoLevelDecorators
}
