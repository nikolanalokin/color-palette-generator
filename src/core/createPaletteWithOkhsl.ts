import { deltaE, getColorInfo } from './utils'
import { Palette } from './types'
import { createShadeWithOkhsl, DEFAULT_TONES_SCALE, findClosestShadeNumber } from './createShadeWithOkhsl'

export type OkhslPaletteFnProps = {
    baseColor: string
    scale?: number[]
    useApca?: boolean
    fixBase?: boolean
    hueShift?: number
    decreaseSaturationRatio?: number
}

export function createPaletteWithOkhsl (props: OkhslPaletteFnProps): Palette {
    const {
        baseColor,
        scale = DEFAULT_TONES_SCALE,
        useApca,
        fixBase,
        hueShift = 0,
        decreaseSaturationRatio,
    } = props || {}
    const baseColorInfo = getColorInfo(baseColor)
    const baseColorShadeNumber = findClosestShadeNumber(baseColor, scale)
    const shades = scale.map(tone => {
        const shadeHex = createShadeWithOkhsl({
            baseColor: baseColorInfo.hexcode,
            baseTone: baseColorShadeNumber,
            tone,
            scale,
            useApca,
            fixBase,
            hueShift,
            decreaseSaturationRatio,
        })
        const shadeInfo = getColorInfo(shadeHex)
        return {
            number: tone,
            ...shadeInfo,
            delta: deltaE(baseColorInfo.hexcode, shadeInfo.hexcode)
        }
    })
    return {
        input: baseColorInfo,
        shades,
        closestShade: shades.reduce((s1, s2) => s1.delta < s2.delta ? s1 : s2),
    }
}
