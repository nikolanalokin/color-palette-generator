import { Color, differenceCiede2000, formatHex, hsl, okhsl, oklch, rgb, wcagContrast } from 'culori'
import { ColorInfo } from './types'
import { APCAcontrast, sRGBtoY } from 'apca-w3'
import { clamp } from './math'

export const BLACK_HEX = '#000000'
export const WHITE_HEX = '#ffffff'

export const APCA_BLACK_ON_RANGE = [104.0277401822167, 0]
export const APCA_WHITE_ON_RANGE = [0, -107.88473318309848]
export const APCA_ON_BLACK_RANGE = [-105.65824801241264, 0]
export const APCA_ON_WHITE_RANGE = [0, 106.04067321268862]

export function getColorInfo (color: Color | string): ColorInfo {
    const hexColor = formatHex(color)
    return {
        hex: formatHex(color),
        rgb: rgb(hexColor),
        hsl: hsl(hexColor),
        okhsl: okhsl(hexColor),
        oklch: oklch(hexColor),
        apca: {
            onBlack: contrastAPCA(hexColor, BLACK_HEX),
            onWhite: contrastAPCA(hexColor, WHITE_HEX),
            blackOn: contrastAPCA(BLACK_HEX, hexColor),
            whiteOn: contrastAPCA(WHITE_HEX,hexColor),
        },
        wcag: {
            onBlack: wcagContrast(hexColor, BLACK_HEX),
            onWhite: wcagContrast(hexColor, WHITE_HEX),
            blackOn: wcagContrast(BLACK_HEX, hexColor),
            whiteOn: wcagContrast(WHITE_HEX, hexColor),
        },
    }
}

export const deltaE = differenceCiede2000()

const contrastScoreCache = new Map()

export function contrastAPCA (fgColor: string, bgColor: string) {
    const key = `${fgColor}:${bgColor}`
    if (contrastScoreCache.has(`${fgColor}:${bgColor}`)) {
        return contrastScoreCache.get(key)
    }
    const score = +APCAcontrast(sRGBtoY(colorToRGB(fgColor)), sRGBtoY(colorToRGB(bgColor)))
    contrastScoreCache.set(key, score)
    return score
}

function colorToRGB (color: string): [r: number, g: number, b: number] {
    const c = rgb(color)
    return [fixup(c.r), fixup(c.g), fixup(c.b)]
}

function fixup (value: number) {
    return Math.round(clamp(value) * 255)
}

export function findNearestValueInScale (value: number, scale: number[]) {
    return scale
        .map(sValue => ([sValue, sValue - value]))
        .reduce((sValue1, sValue2) => Math.abs(sValue1[1]) < Math.abs(sValue2[1]) ? sValue1 : sValue2)[0]
}
