import { Color, Hsl, Okhsl, Oklch, Rgb } from 'culori'

export type PaletteInfo = {
    guid: string
    inputColorName: string
    inputColor: string | Color
    inputShade: ShadeInfo
    shades: ShadeInfo[]
    nearestShade: ShadeInfo
}

export type ShadeInfo = ColorInfo & {
    guid: string
    number: number
    normalized: number
    delta: number
}

export type ColorInfo = {
    hex: string
    rgb: Rgb
    hsl: Hsl
    okhsl: Okhsl
    oklch: Oklch
    apca: ContrastInfo
    wcag: ContrastInfo
}

export type ContrastInfo = {
    onBlack: number
    onWhite: number
    whiteOn: number
    blackOn: number
}
