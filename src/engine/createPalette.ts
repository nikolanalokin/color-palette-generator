import { Color, formatHex, getMode, Mode, useMode } from 'culori'
import { invlerp, lerp } from './math'
import { deltaE, findNearestValueInScale, getColorInfo, getNearestColorNames, uniqueId } from './utils'
import { PaletteInfo, ShadeInfo } from './types'
import { interpolate, InterpolatorProps } from './interpolate'

export type CreatePaletteProps = {
    color: string | Color
    mode: Mode
    scale: number[]
    interpolators: InterpolatorProps[]
}

export function createPalette (props: CreatePaletteProps): PaletteInfo {
    const {
        color,
        mode,
        scale,
        interpolators,
    } = props

    const converter = useMode(getMode(mode))

    const scaleMin = scale.at(0), scaleMax = scale.at(-1)

    const baseColor = converter(color)

    // const baseScaleValue = this.defineProcessor?.define(baseColor) ?? .5
    // const baseTone = lerp(scaleMin, scaleMax, baseScaleValue)
    // const nearestTone = findNearestValueInScale(baseTone, scale)
    // const nearestScaleValue = invlerp(scaleMin, scaleMax, nearestTone)

    const shades: ShadeInfo[] = scale.map(tone => {
        const shadeScaleValue = invlerp(scaleMin, scaleMax, tone)

        let shadeColor = baseColor
        for (const interpolatorProps of interpolators) {
            shadeColor = interpolate(shadeColor, shadeScaleValue, interpolatorProps)
        }

        return {
            guid: uniqueId(),
            number: tone,
            normalized: shadeScaleValue,
            ...getColorInfo(shadeColor),
            delta: deltaE(formatHex(baseColor), formatHex(shadeColor)),
        }
    })

    const inputShade: ShadeInfo = {
        guid: uniqueId(),
        number: null,
        normalized: null,
        ...getColorInfo(color),
        delta: null,
    }

    const nearestShade = shades.reduce((shade1, shade2) => shade1.delta < shade2.delta ? shade1 : shade2)

    return {
        guid: uniqueId(),
        inputColorName: getNearestColorNames(color).at(0),
        inputColor: color,
        inputShade,
        shades,
        nearestShade,
    }
}
