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
    name: string
    inputShade: ShadeInfo
    shades: ShadeInfo[]
    nearestShade: ShadeInfo
}

export type CreateShadeFnOptions = {}

export interface CreateShadeFn<O extends CreateShadeFnOptions> {
    (inputColor: string | Color, tone: number, scale: number[], options?: O): ShadeInfo
    findTone(color: string | Color, scale: number[]): number
    findScaleValue(color: string | Color, scale: number[]): number
}
