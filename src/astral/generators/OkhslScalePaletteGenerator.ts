import { Color, formatHex, okhsl, Okhsl } from 'culori'
import { Processor } from '../processors'
import { PaletteInfo, ShadeInfo } from '../types'
import { invlerp, lerp } from '../math'
import { deltaE, findNearestValueInScale, getColorInfo, getNearestColorNames, uniqueId } from '../utils'

export interface OkhslScalePaletteGeneratorOptions {
    scale: number[]
    processors: Processor<Okhsl>[]
}

export class OkhslScalePaletteGenerator {
    scale: number[]
    processors: Processor<Okhsl>[]

    constructor (options: OkhslScalePaletteGeneratorOptions) {
        this.scale = options.scale
        this.processors = options.processors
    }

    get scaleMin () {
        return this.scale.at(0)
    }

    get scaleMax () {
        return this.scale.at(-1)
    }

    get defineProcessor () {
        return this.processors.find(p => 'define' in p)
    }

    generate (color: string | Color): PaletteInfo {
        const baseColor = okhsl(color)
        const baseScaleValue = this.defineProcessor?.define(baseColor) ?? .5
        const baseTone = lerp(this.scaleMin, this.scaleMax, baseScaleValue)

        const nearestTone = findNearestValueInScale(baseTone, this.scale)
        const nearestScaleValue = invlerp(this.scaleMin, this.scaleMax, nearestTone)

        const shades: ShadeInfo[] = this.scale.map(tone => {
            const shadeScaleValue = invlerp(this.scaleMin, this.scaleMax, tone)

            let shadeColor = baseColor
            for (const p of this.processors) {
                shadeColor = p.update(shadeColor, shadeScaleValue, nearestScaleValue)
            }

            return {
                id: uniqueId(),
                number: tone,
                normalized: shadeScaleValue,
                ...getColorInfo(shadeColor),
                delta: deltaE(formatHex(baseColor), formatHex(shadeColor)),
            }
        })

        const inputShade: ShadeInfo = {
            id: uniqueId(),
            number: baseTone,
            normalized: baseScaleValue,
            ...getColorInfo(color),
            delta: 0,
        }

        const nearestShade = shades.reduce((shade1, shade2) => shade1.delta < shade2.delta ? shade1 : shade2)

        return {
            id: uniqueId(),
            name: getNearestColorNames(color).at(0),
            inputShade,
            shades,
            nearestShade,
        }
    }
}
