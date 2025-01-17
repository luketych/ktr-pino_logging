import assert from 'assert'
import chalk from 'chalk'


/** Formats the log message.
    Not responsible for the header of the message.
 * 
 * @param {*} options 
 * @returns 
 */
const basicStringFormatter = (options) => ((loggableObjMeta) => {
    assert(typeof loggableObjMeta === 'object', 'logObj is not an object.')

    const loggableString = chalk.italic(JSON.stringify(loggableObjMeta))

    // console.log(lobObjData_str)

    return { loggableString  }
})

export default basicStringFormatter