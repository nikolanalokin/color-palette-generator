import { Okhsl } from 'culori'
import { Processor } from './Processor'

export interface OkhslLightnessLinearProcessorOptions {

}

export class OkhslLightnessLinearProcessor implements Processor<Okhsl> {
    constructor (options: OkhslLightnessLinearProcessorOptions = {}) {

    }

    update (color: Okhsl, scaleValue: number): Okhsl {
        return {
            ...color,
            l: 1 - scaleValue,
        }
    }

    define (color: Okhsl): number {
        return 1 - color.l
    }
}

export function getDefaultOkhslLightnessLinearProcessorValue (): OkhslLightnessLinearProcessorOptions {
    return {
        value: 0,
        scaleZero: null
    }
}
