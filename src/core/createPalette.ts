import { getColorInfo, getNearestColorNames, uniqueId } from './utils'
import { PaletteInfo } from './types'
import { createShadeViaContrast, CreateShadeViaContrastFnOptions } from './createShadeViaContrast'
import { createShadeViaLightness, CreateShadeViaLightnessFnOptions } from './createShadeViaLightness'
import { Color } from 'culori'

export const DEFAULT_TONES_SCALE = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

export type PaletteFnProps = {
    scale?: number[]
    method?: 'lightness' | 'contrast'
} & (CreateShadeViaContrastFnOptions | CreateShadeViaLightnessFnOptions)

export function createPalette (inputColor: string | Color, props: PaletteFnProps): PaletteInfo {
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
            inputColor,
            tone,
            scale,
            {
                hueShift,
                decreaseSaturationRatio,
            }
        )
        shadesMap.set(tone, shade)
    })
    let nearestShade = shadesMap.values().reduce((shade1, shade2) => shade1.delta < shade2.delta ? shade1 : shade2)
    return {
        name: getNearestColorNames(inputColor).at(0),
        inputShade: {
            id: uniqueId(),
            number: shadeFn.findTone(inputColor, scale),
            normalized: shadeFn.findScaleValue(inputColor, scale),
            ...getColorInfo(inputColor),
            delta: 0,
        },
        shades: scale.map(tone => shadesMap.get(tone)),
        nearestShade,
    }
}
