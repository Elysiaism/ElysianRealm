export function hexToHsl(hex) {
    // Convert hex to RGB first
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    // Find the maximum and minimum values of R, G, B
    const cMax = Math.max(r, g, b);
    const cMin = Math.min(r, g, b);
    const delta = cMax - cMin;

    // Calculate HSL values
    let h, s, l;
    if (delta === 0) {
        h = 0;
    } else if (cMax === r) {
        h = ((g - b) / delta) % 6;
    } else if (cMax === g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (cMax + cMin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    // Return an object with HSL values
    return {h, s, l};
}

export function hslToHex(hsl) {
    const h = hsl.h;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r, g, b;
    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    const rHex = Math.round((r + m) * 255).toString(16).padStart(2, "0");
    const gHex = Math.round((g + m) * 255).toString(16).padStart(2, "0");
    const bHex = Math.round((b + m) * 255).toString(16).padStart(2, "0");

    return "#" + rHex + gHex + bHex;
}

export function enhance(command, hexColor,level=20) {
    let hslColor = hexToHsl(hexColor)
    if (command === 'lighter') hslColor.l = hslColor.l > (100-level) ? 100 : hslColor.l + level
    if (command === 'darker') hslColor.l = hslColor.l < level ? 0 : hslColor.l - level
    return hslToHex(hslColor)
}