import { Okhsl } from 'culori'
import { Processor } from './Processor'

export interface OkhslLightnessQuadProcessorOptions {
    inverse?: boolean
}

export class OkhslLightnessQuadProcessor implements Processor<Okhsl> {
    inverse: boolean

    constructor (options: OkhslLightnessQuadProcessorOptions = {}) {
        this.inverse = options.inverse
    }

    update (color: Okhsl, scaleValue: number): Okhsl {
        return {
            ...color,
            l: this.inverse ? 1 - Math.pow(scaleValue, 2) : Math.pow(scaleValue - 1, 2),
        }
    }

    define (color: Okhsl): number {
        return this.inverse ? Math.sqrt(1 - color.l) : 1 - Math.sqrt(color.l)
    }
}

export function getDefaultOkhslLightnessQuadProcessorValue (): OkhslLightnessQuadProcessorOptions {
    return {
        inverse: false,
    }
}
