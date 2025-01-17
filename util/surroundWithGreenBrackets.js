import chalk from 'chalk'


export default function surroundWithGreenBrackets(text) {
  // Apply Chalk styling to the brackets and text
  const greenBrackets = chalk.green('[[ ') + text + chalk.green(' ]]');

  return greenBrackets;
}