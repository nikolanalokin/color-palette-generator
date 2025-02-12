import { getGenerator, getProcessor, ProcessorType } from '../astral'
import { CommonPaletteSettingsVO } from '../types'

export const processorOptions: Array<{
    value: ProcessorType
    label: string
    description: string
}> = [
    {
        value: 'OkhslHueShiftProcessor',
        label: 'OkhslHueShiftProcessor',
        description: 'Линейное изменение цветового тона на заданное значение с 0 на заданной точке',
    },
    {
        value: 'OkhslHueShiftRotateProcessor',
        label: 'OkhslHueShiftRotateProcessor',
        description: 'Линейная интерполяция цветового тона по двум точкам',
    },
    {
        value: 'OkhslLightnessBezierProcessor',
        label: 'OkhslLightnessBezierProcessor',
        description: 'Безье интерполяция светлоты',
    },
    {
        value: 'OkhslLightnessLinearProcessor',
        label: 'OkhslLightnessLinearProcessor',
        description: 'Линейная интерполяция светлоты',
    },
    {
        value: 'OkhslSaturationProcessor',
        label: 'OkhslSaturationProcessor',
        description: 'Параболлическое уменьшение насыщенности с 0 на заданной точке',
    },
]

export function getGeneratorInstance (props: CommonPaletteSettingsVO) {
    const {
        scale,
        generator,
        processors,
    } = props

    const Generator = getGenerator(generator)

    if (!Generator) {
        return null
    }

    const instance = new Generator({
        scale,
        processors: processors.map(processor => {
            const Processor = getProcessor(processor.type)
            return new Processor(processor.options as any)
        })
    })

    return instance
}
