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
    delta: number
}

export type Palette = {
    input: ColorInfo
    shades: ShadeInfo[]
    closestShade: ShadeInfo
}
