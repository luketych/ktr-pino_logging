import chalk from 'chalk'

import {surroundWithGreenBrackets, encapsulateInBackgroundColor} from '../../util/index.js'


export default function debug(message, origin, ...args) {
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


    if (this.tags.length > 0) {
      header += ' tags:['
      header += `${this.tags.join(',')}`
      header += ']'
    }


    header += ` from:(`
    header += this._caller



    const pathTail = this._caller.split('//')[1] 
    const lineNumColNum = origin.split(pathTail)[1]

    header += (lineNumColNum) ? lineNumColNum : ''


    header += ')'

    




    const msgWithBkgrd = encapsulateInBackgroundColor(msg, '#FFF7C5')
    


    header = chalk.bold.hex(this.colorDebug)(header)
    header = surroundWithGreenBrackets(header)

    //msg = chalk.italic.hex(this.colorWarn)(msg)
    msg = chalk.italic(msg)
    
    this.logger.debug(header)
    this.logger.debug(chalk.italic(msgWithBkgrd))
}