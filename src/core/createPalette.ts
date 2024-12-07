import { getColorInfo, getNearestColorNames } from './utils'
import { PaletteInfo } from './types'
import { createShadeViaContrast } from './createShadeViaContrast'
import { createShadeViaLightness } from './createShadeViaLightness'

export const DEFAULT_TONES_SCALE = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000]

export type PaletteFnProps = {
    scale?: number[]
    method?: 'lightness' | 'contrast'
    hueShift?: number
    decreaseSaturationRatio?: number
}

export function createPalette (baseColor: string, props: PaletteFnProps): PaletteInfo {
    const {
        scale = DEFAULT_TONES_SCALE,
        method = 'contrast',
        hueShift = 0,
        decreaseSaturationRatio = 0,
    } = props || {}
    const shadesMap = new Map()
    const shadeFn = {
        lightness: createShadeViaLightness,
        contrast: createShadeViaContrast,
    }[method]
    scale.forEach(tone => {
        const shade = shadeFn(
            baseColor,
            tone,
            scale,
            {
                hueShift,
                decreaseSaturationRatio,
            }
        )
        shadesMap.set(tone,shade)
    })
    let nearestShade = shadesMap.values().reduce((shade1, shade2) => shade1.delta < shade2.delta ? shade1 : shade2)
    return {
        name: getNearestColorNames(baseColor).at(0),
        inputShade: {
            number: shadeFn.findTone(baseColor, scale),
            normalized: shadeFn.findScaleValue(baseColor, scale),
            ...getColorInfo(baseColor),
            delta: 0,
        },
        shades: scale.map(tone => shadesMap.get(tone)),
        nearestShade,
    }
}
