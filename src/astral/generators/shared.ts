import { OkhslScalePaletteGenerator, OkhslScalePaletteGeneratorOptions } from './OkhslScalePaletteGenerator'

export type GeneratorType =
    | 'OkhslScalePaletteGenerator'

export type GeneratorOptions =
    | OkhslScalePaletteGeneratorOptions

const PROCESSOR_MAP = {
    OkhslScalePaletteGenerator: OkhslScalePaletteGenerator,
}

export function getGenerator (type: GeneratorType) {
    return PROCESSOR_MAP[type]
}
