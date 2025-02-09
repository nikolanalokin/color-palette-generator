import { Okhsl } from 'culori'
import { bezier, Point } from '../math'
import { Processor } from './Processor'

export interface OkhslLightnessBezierProcessorOptions {
    p0: Point
    p1: Point
    p2: Point
}

export class OkhslLightnessBezierProcessor implements Processor<Okhsl> {
    p0: Point
    p1: Point
    p2: Point

    constructor (options: OkhslLightnessBezierProcessorOptions) {
        this.p0 = options.p0
        this.p1 = options.p1
        this.p2 = options.p2
    }

    update (color: Okhsl, scaleValue: number): Okhsl {
        return {
            ...color,
            l: 1 - bezier(scaleValue, this.p0, this.p1, this.p2)[1],
        }
    }

    define (color: Okhsl): number {
        const b = 1 - color.l
        const p0 = this.p0[1]
        const p1 = this.p1[1]
        const p2 = this.p2[1]

        return (p0 - p1 + Math.sqrt(b * (p0 - 2 * p1 + p2) + Math.pow(p1, 2) - p0 * p2)) / (p0 - 2 * p1 + p2)
    }
}

export function getDefaultOkhslLightnessBezierProcessorValue (): OkhslLightnessBezierProcessorOptions {
    return {
        p0: [0, 0],
        p1: [0.5, 0.5],
        p2: [1, 1],
    }
}
