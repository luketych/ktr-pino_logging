import assert from 'assert'
import chalk from 'chalk'

import {flatten} from 'ktr-util'


/** Formats the log message.
    Not responsible for the header of the message.
 * 
 * @param {*} options 
 * @returns 
 */
const flattenObjectFormatter = (options) => ((logObj) => {
    assert(typeof logObj === 'object', 'logObj is not an object.')


    const flattenedData = flatten(logObj)


    return flattenedData
})

export default flattenObjectFormatter