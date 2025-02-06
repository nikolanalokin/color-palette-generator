import { createDefaultColor } from '../stores'
import { OkhslScalePaletteGenerator } from './generators'
import { OkhslHueShiftProcessor, OkhslLightnessLinearProcessor, OkhslSaturationProcessor } from './processors'

const scale = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

const paletteGenerator = new OkhslScalePaletteGenerator({
    scale,
    processors: [
        new OkhslHueShiftProcessor({ value: -5 }),
        new OkhslSaturationProcessor({ value: .5 }),
        new OkhslLightnessLinearProcessor(),
    ],
})

const palette = paletteGenerator.generate(createDefaultColor())

console.log(palette)
