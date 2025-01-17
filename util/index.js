import constructHeader from './constructHeader.js'
import encapsulateInBackgroundColor from './encapsulateInBackgroundColor.js'
import findPatternInArray from './findPatternInArray.js'
import _hexToRgb from './_hexToRgb.js'
import surroundWithGreenBrackets from './surroundWithGreenBrackets.js'


export {constructHeader}
export {encapsulateInBackgroundColor}
export {findPatternInArray}
export {_hexToRgb}
export {surroundWithGreenBrackets}


const util = {
  constructHeader,
  encapsulateInBackgroundColor, 
  findPatternInArray,
  _hexToRgb, 
  surroundWithGreenBrackets
}


export default {
  util
}