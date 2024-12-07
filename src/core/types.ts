import { Hsl, Okhsl, Oklch, Rgb } from 'culori'

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
    number: number
    normalized: number
    delta: number
}

export type PaletteInfo = {
    name: string
    inputShade: ShadeInfo
    shades: ShadeInfo[]
    nearestShade: ShadeInfo
}

export type CreateShadeFnOptions = {}

export interface CreateShadeFn<O extends CreateShadeFnOptions> {
    (baseColor: string, tone: number, scale: number[], options?: O): ShadeInfo
    findTone(hex: string, scale: number[]): number
    findScaleValue(hex: string, scale: number[]): number
}
