import { Okhsl } from 'culori'
import { Processor } from './Processor'
import { linear } from '../../core/math'

export interface OkhslHueShiftRotateProcessorOptions {
    point1: number
    value1: number
    point2: number
    value2: number
    scaleZero?: number
}

export class OkhslHueShiftRotateProcessor implements Processor<Okhsl> {
    point1: number
    value1: number
    point2: number
    value2: number
    scaleZero: number

    constructor (options: OkhslHueShiftRotateProcessorOptions) {
        this.point1 = options.point1
        this.value1 = options.value1
        this.point2 = options.point2
        this.value2 = options.value2
        this.scaleZero = options.scaleZero
    }

    update (color: Okhsl, scaleValue: number, scaleZero: number): Okhsl {
        let computeHueShift = 0, scaleInitial = this.scaleZero || scaleZero || 1, baseHue = color.h
        if (this.point1 <= baseHue && baseHue < this.point2) {
            const shiftedBaseHue = (baseHue - this.point1) % 360
            computeHueShift = ((this.value2 - this.value1) / (this.point2 - this.point1)) * shiftedBaseHue + this.value1
        } else {
            const shiftedBaseHue = (baseHue - (this.point2 - 360)) % 360
            computeHueShift = ((this.value1 - this.value2) / (this.point1 - (this.point2 - 360))) * shiftedBaseHue + this.value2
        }
        return {
            ...color,
            h: linear(scaleValue, -computeHueShift, scaleInitial, baseHue),
        }
    }
}

export function getDefaultOkhslHueShiftRotateProcessorValue (): OkhslHueShiftRotateProcessorOptions {
    return {
        point1: 110,
        value1: 0,
        point2: 264,
        value2: 0,
        scaleZero: null
    }
}
