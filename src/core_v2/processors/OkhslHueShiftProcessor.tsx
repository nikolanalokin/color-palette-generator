import { Okhsl } from 'culori'
import { Processor } from './Processor'
import { linear } from '../../core/math'

export interface OkhslHueShiftProcessorOptions {
    value: number
    scaleZero?: number
}

export class OkhslHueShiftProcessor implements Processor<Okhsl> {
    value: number
    scaleZero: number

    constructor (options: OkhslHueShiftProcessorOptions) {
        this.value = options.value
        this.scaleZero = options.scaleZero
    }

    update (color: Okhsl, scaleValue: number, scaleZero: number): Okhsl {
        let scaleInitial = this.scaleZero || scaleZero || 1, baseHue = color.h
        return {
            ...color,
            h: linear(scaleValue, this.value, scaleInitial, baseHue),
        }
    }
}
