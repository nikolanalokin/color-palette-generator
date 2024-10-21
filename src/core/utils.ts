import { differenceCiede2000, formatHex, hsl, okhsl, rgb } from 'culori'
import { ColorInfo } from './types'
import { APCAcontrast, sRGBtoY } from 'apca-w3'
import { clamp } from './math'

export function getColorInfo (color: string): ColorInfo {
    return {
        hexcode: formatHex(color),
        hsl: {
            hue: Math.round(hsl(color).h) || 0,
            saturation: Math.round(hsl(color).s * 100),
            lightness: Math.round(hsl(color).l * 100),
        },
        okhsl: {
            hue: Math.round(okhsl(color).h) || 0,
            saturation: Math.round(okhsl(color).s * 100),
            lightness: Math.round(okhsl(color).l * 100),
        },
    }
}

export const deltaE = differenceCiede2000()

export function contrastAPCA (fgColor: string, bgColor: string) {
    return +APCAcontrast(sRGBtoY(colorToRGB(fgColor)), sRGBtoY(colorToRGB(bgColor)))
}

function colorToRGB (color: string): [r: number, g: number, b: number] {
    const c = rgb(color)
    return [fixup(c.r), fixup(c.g), fixup(c.b)]
}

function fixup (value: number) {
    return Math.round(clamp(value) * 255)
}
