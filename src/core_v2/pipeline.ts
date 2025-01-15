import { Color, Mode } from 'culori'
import { LightnessProcessor } from './processors/lightness-processor'
import { Processor } from './processors/Processor'

const pipeline = new Pipeline(
    [
        new OkhslHueProcessor({ shift: -5 }),
        new OkhslSaturationProcessor({ type: 'equal-parabola', decrease: .5 }),
        new OkhslLightnessProcessor({ type: 'linear' }),
    ],
)

const inputColor = '#123989'
const scale = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

const paletteGenerator = new OkhslScalePaletteGenerator({
    color: inputColor,
    scale,
    pipeline,
})

const palette = paletteGenerator.execute()

class Pipeline {
    processors: Processor[]

    constructor (processors: Processor[]) {
        this.processors = processors
    }
}
