export default function _hexToRgb(hex) {
    // Remove the # symbol if it's present
    hex = hex.replace(/^#/, '');

    // Parse the hexadecimal color code into RGB components
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    
    return { r, g, b };
}