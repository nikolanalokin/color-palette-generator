import { Color, Hsl, Okhsl, Oklch, Rgb } from 'culori'

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

export type ShadeInfo = ColorInfo & {
    id: string
    number: number
    normalized: number
    delta: number
}

export type PaletteInfo = {
    id: string
    name: string
    inputShade: ShadeInfo
    shades: ShadeInfo[]
    nearestShade: ShadeInfo
}

export type SetInfo = {
    id: string
    name: string
    palettes: PaletteInfo[]
}
