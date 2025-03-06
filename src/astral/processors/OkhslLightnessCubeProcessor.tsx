import { Okhsl } from 'culori'
import { Processor } from './Processor'

export interface OkhslLightnessCubeProcessorOptions {
    inverse?: boolean
}

export class OkhslLightnessCubeProcessor implements Processor<Okhsl> {
    inverse: boolean

    constructor (options: OkhslLightnessCubeProcessorOptions = {}) {
        this.inverse = options.inverse
    }

    update (color: Okhsl, scaleValue: number): Okhsl {
        return {
            ...color,
            l: this.inverse ? 1 - Math.pow(scaleValue, 3) : Math.pow(1 - scaleValue, 3),
        }
    }

    define (color: Okhsl): number {
        return this.inverse ? Math.cbrt(1 - color.l) : Math.cbrt(color.l)
    }
}

export function getDefaultOkhslLightnessCubeProcessorValue (): OkhslLightnessCubeProcessorOptions {
    return {
        inverse: false,
    }
}
