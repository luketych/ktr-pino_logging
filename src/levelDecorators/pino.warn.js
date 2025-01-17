import assert from 'assert'
import chalk from 'chalk'

import {encapsulateInBackgroundColor, surroundWithGreenBrackets} from '../../util/index.js'


export default function warn(message, callerInfo, ...args) {
    // assert this is not undefined

    assert(this !== undefined, 'this is undefined')
    
    
    let header = ""
    let msg = (Array.isArray(message)) ? message.join(this.DELIMITER) : message

    args.forEach((arg) => {
      msg += ` ${JSON.stringify(arg)}`
    })


    const dtStr = (this.dtStrType === 'time') 
    ? new Date().toISOString().slice(11,19) // time only
    : new Date().toISOString().slice(0,24) // date and time

    header += `${dtStr}`


    if (this.tags?.length > 0) {
      header += ' tags:['
      header += `${this.tags.join(',')}`
      header += ']'
    }


    header += ` from:(`
    header += this._caller



    const pathTail = this._caller.split('//')[1] 
    const lineNumAndColNum = callerInfo.split(pathTail)[1]

    header += (lineNumAndColNum) ? lineNumAndColNum : ''


    header += ')'

    




    const msgWithBkgrd = encapsulateInBackgroundColor(msg, '#FFF7C5')
    


    header = chalk.bold.hex(this.colors.warn)(header)
    header = surroundWithGreenBrackets(header)

    //msg = chalk.italic.hex(this.colorWarn)(msg)
    msg = chalk.italic(msg)


    //this.logger.warn.call(header)
    this.logger.warn(header)
    this.logger.warn(chalk.italic(msgWithBkgrd))
}