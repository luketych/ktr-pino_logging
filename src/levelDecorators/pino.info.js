import chalk from 'chalk'

import constructHeader from '../../util/constructHeader.js'
import {encapsulateInBackgroundColor} from '../../util/index.js'


export default function info(loggableObj, caller, ...args) {
    //let header = constructHeader(caller, this.tags, this.options)
    //header = chalk.bold.hex(this.options.colors.info)(header)

    const loggableObjMeta = {
      "caller": caller,
      "tags": this.tags,
      "options": this.options,
      "loggableObj": loggableObj,
    }


    this.logger.info(loggableObjMeta)
}