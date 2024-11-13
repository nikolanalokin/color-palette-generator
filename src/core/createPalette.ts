import { deltaE, getColorInfo } from './utils'
import { Palette } from './types'
import { createShadeViaApca, findClosestShadeNumber } from './createShadeViaApca'
import { createShadeViaLightness } from './createShadeViaLightness'

export const DEFAULT_TONES_SCALE = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000]

export type OkhslPaletteFnProps = {
    baseColor: string
    scale?: number[]
    method?: 'lightness' | 'apca'
    fixBase?: boolean
    hueShift?: number
    decreaseSaturationRatio?: number
}

export function createPalette (props: OkhslPaletteFnProps): Palette {
    const {
        baseColor,
        scale = DEFAULT_TONES_SCALE,
        method = 'apca',
        fixBase,
        hueShift = 0,
        decreaseSaturationRatio = 0,
    } = props || {}
    const baseColorInfo = getColorInfo(baseColor)
    // const baseColorShadeNumber = findClosestShadeNumber(baseColor, scale)
    const shadesMap = new Map()
    const shadeFn = {
        lightness: createShadeViaLightness,
        apca: createShadeViaApca,
    }[method]
    scale.forEach(tone => {
        const shade = shadeFn({
            baseColor: baseColorInfo.okhsl,
            // baseTone: baseColorShadeNumber,
            tone,
            scale,
            fixBase,
            hueShift,
            decreaseSaturationRatio,
        })
        shadesMap.set(tone, {
            number: tone,
            ...shade,
            delta: deltaE(baseColorInfo.okhsl, shade.okhsl),
        })
    })
    let closestShade = shadesMap.values().reduce((s1, s2) => s1.delta < s2.delta ? s1 : s2)
    // if (fixBase) {
    //     const fixedShade = {
    //         number: closestShade.number,
    //         ...baseColorInfo,
    //         delta: 0,
    //     }
    //     shadesMap.set(closestShade.number, fixedShade)
    //     closestShade = fixedShade
    // }
    return {
        input: baseColorInfo,
        shades: scale.map(tone => shadesMap.get(tone)),
        closestShade,
    }
}
