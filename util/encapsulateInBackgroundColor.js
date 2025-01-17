import _hexToRgb from './_hexToRgb.js'


export default function encapsulateInBackgroundColor(text, hexColorCode) {
    const rgbColor = _hexToRgb(hexColorCode);
    const bgColor = `\x1b[48;2;${rgbColor.r};${rgbColor.g};${rgbColor.b}m`; // ANSI escape code for background color
    const resetColor = '\x1b[0m'; // ANSI escape code to reset color
    
   
    return `${bgColor}${text}${resetColor}`;
}