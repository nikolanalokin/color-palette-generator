import { Color, formatHex, getMode, Okhsl, okhsl } from 'culori'
import { Processor } from './Processor'
import { bezier, invlerp, lerp, Point } from '../../core/math'
import { deltaE, findNearestValueInScale } from '../../core/utils'

const P0: Point = [0, 0]
const P1: Point = [0.7, 0.15]
const P2: Point = [1, 1]

type LightnessProcessorOptions = {
    pre: any[]
    post: any[]
}

export class LightnessProcessor {
    baseColor: string | Color
    pre: any[]
    post: any[]

    constructor (inputColor: string | Color, options: LightnessProcessorOptions) {
        this.baseColor = inputColor
        this.pre = options.pre
        this.post = options.post
    }

    get baseColorMode () {
        return typeof this.baseColor === 'string' ? 'hex' : this.baseColor.mode
    }

    calculate (inputColor: string | Color, scale: number[], tone: number) {
        const baseColor = okhsl(inputColor)
        const baseScaleValue = LightnessProcessor.findScaleValueByValue(baseColor.l)
        const baseTone = lerp(scale.at(0), scale.at(-1), baseScaleValue)
        const nearestTone = findNearestValueInScale(baseTone, scale)
        const nearestScaleValue = invlerp(scale.at(0), scale.at(-1), nearestTone)
        const shadeScaleValue = invlerp(scale.at(0), scale.at(-1), tone)
        const shadeColor = { ...baseColor } as Okhsl

        shadeColor.l = LightnessProcessor.findValueByScaleValue(shadeScaleValue)

        return shadeColor
    }

    static findValueByScaleValue (scaleValue: number) {
        return 1 - scaleValue

        // далее для bezier
        const scalePoint = bezier(scaleValue, P0, P1, P2)

        return 1 - scalePoint[1]
    }

    findTone (color: string | Color, scale: number[]) {
        return lerp(scale.at(0), scale.at(-1), LightnessProcessor.findScaleValueByValue(okhsl(color).l))
    }

    findScaleValue (color: string | Color, scale: number[]) {
        return LightnessProcessor.findScaleValueByValue(okhsl(color).l)
    }

    static findScaleValueByValue (lightness: number) {
        return 1 - lightness

        // далее для bezier
        const b = 1 - lightness
        const y0 = P0[1]
        const y1 = P1[1]
        const y2 = P2[1]

        return (y0 - y1 + Math.sqrt(b * (y0 - 2 * y1 + y2) + Math.pow(y1, 2) - y0 * y2)) / (y0 - 2 * y1 + y2)
    }

    static findClosestShadeNumber (inputColor: Color | string, scale: number[]) {
        const inputOkhls = okhsl(inputColor)

        const b = 1 - inputOkhls.l
        const p0 = P0[1]
        const p1 = P1[1]
        const p2 = P2[1]

        const scaleValue = (p0 - p1 + Math.sqrt(b * (p0 - 2 * p1 + p2) + Math.pow(p1, 2) - p0 * p2)) / (p0 - 2 * p1 + p2)

        const inputScaleNumber = lerp(scale.at(0), scale.at(-1), scaleValue)
        return findNearestValueInScale(inputScaleNumber, scale)
    }
}
