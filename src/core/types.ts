export type ColorInfo = {
    hexcode: string
    hsl: {
        hue: number
        saturation: number
        lightness: number
    }
    okhsl: {
        hue: number
        saturation: number
        lightness: number
    }
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
