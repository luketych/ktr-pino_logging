import assert from 'assert'
import chalk from 'chalk'


/** Formats the log message.
    Not responsible for the header of the message.
 * 
 * @param {*} options 
 * @returns 
 */
const basicFormatter = (options) => ((loggableObjMeta) => {
    assert(typeof loggableObjMeta === 'object', 'logObj is not an object.')

    const loggableObject = { ...loggableObjMeta }

    return loggableObject
})

export default basicFormatter