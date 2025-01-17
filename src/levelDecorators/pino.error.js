import chalk from 'chalk'

import {encapsulateInBackgroundColor} from '../../util/index.js'


export default function error(message, origin, ...args) {
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


      const msgWithBkgrd = encapsulateInBackgroundColor(msg, '#FFCFE8')
      


      header = chalk.bold.hex(this.colorError)(header)
      msg = chalk.italic(msg)
      
      this.logger.info(header)
      this.logger.info(chalk.italic(msgWithBkgrd))
}