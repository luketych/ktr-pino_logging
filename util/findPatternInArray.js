import _convertToRegExpPattern from './_convertToRegExpPattern.js'


export default function _findPatternInArray(array, pattern) {

  const regexPattern = _convertToRegExpPattern(pattern)

  // Create a regular expression with the modified pattern
  const regex = new RegExp(`${regexPattern}`);

  // Find the first element that matches the pattern
  const ret_val = array.find(element => regex.test(element));

  return ret_val
}