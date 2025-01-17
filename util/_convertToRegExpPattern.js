/** paths must have trailing /'s if they are a directory.
    This is to ensure that the final regex pattern is correct.
 */
export default function _convertToRegExpPattern(inputPattern) {
  // 1. Split at **/
  const [head, tail] = inputPattern.split('**/')

  // 2. Escape /'s and .'s
  const escapedHead = head.replace(/\//g, '\\/').replace(/\./g, '\\.')
  const escapedTail = tail?.replace(/\//g, '\\/').replace(/\./g, '\\.') || ''

  // 3. Replace **/ with (?:.\/)*
  const middle = '(?:.\\/)*'

  // 4. Combine into final pattern
  const finalPattern = escapedHead + middle + escapedTail


  return finalPattern
}