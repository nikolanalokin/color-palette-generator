import { Okhsl } from 'culori'
import { Processor } from './Processor'

export interface OkhslSaturationProcessorOptions {
    value: number
    scaleZero?: number
}

export class OkhslSaturationProcessor implements Processor<Okhsl> {
    value: number
    scaleZero: number

    constructor (options: OkhslSaturationProcessorOptions) {
        this.value = options.value
        this.scaleZero = options.scaleZero
    }

    update (color: Okhsl, scaleValue: number, scaleZero: number): Okhsl {
        let s = color.s, scalePeak = this.scaleZero || scaleZero || s, minSaturation = (1 - this.value) * s, maxSaturation = s

        if (scaleValue < scalePeak) {
            const a = (minSaturation - maxSaturation) / Math.pow(0 - scalePeak, 2)
            s = a * Math.pow(scaleValue - scalePeak, 2) + maxSaturation
        }

        const a = (minSaturation - maxSaturation) / Math.pow(1 - scalePeak, 2)
        s = a * Math.pow(scaleValue - scalePeak, 2) + maxSaturation

        return {
            ...color,
            s,
        }
    }
}

export function getDefaultOkhslSaturationProcessorValue (): OkhslSaturationProcessorOptions {
    return {
        value: 0,
        scaleZero: null
    }
}
