import { getDefaultOkhslHueShiftProcessorValue, OkhslHueShiftProcessor, OkhslHueShiftProcessorOptions } from './OkhslHueShiftProcessor'
import { getDefaultOkhslHueShiftRotateProcessorValue, OkhslHueShiftRotateProcessor, OkhslHueShiftRotateProcessorOptions } from './OkhslHueShiftRotateProcessor'
import { getDefaultOkhslLightnessBezierProcessorValue, OkhslLightnessBezierProcessor, OkhslLightnessBezierProcessorOptions } from './OkhslLightnessBezierProcessor'
import { getDefaultOkhslLightnessCubeProcessorValue, OkhslLightnessCubeProcessor, OkhslLightnessCubeProcessorOptions } from './OkhslLightnessCubeProcessor'
import { getDefaultOkhslLightnessLinearProcessorValue, OkhslLightnessLinearProcessor, OkhslLightnessLinearProcessorOptions } from './OkhslLightnessLinearProcessor'
import { getDefaultOkhslLightnessQuadProcessorValue, OkhslLightnessQuadProcessor, OkhslLightnessQuadProcessorOptions } from './OkhslLightnessQuadProcessor'
import { getDefaultOkhslSaturationProcessorValue, OkhslSaturationProcessor, OkhslSaturationProcessorOptions } from './OkhslSaturationProcessor'

export type ProcessorType =
    | 'OkhslHueShiftProcessor'
    | 'OkhslHueShiftRotateProcessor'
    | 'OkhslLightnessBezierProcessor'
    | 'OkhslLightnessLinearProcessor'
    | 'OkhslLightnessQuadProcessor'
    | 'OkhslLightnessCubeProcessor'
    | 'OkhslSaturationProcessor'

export type ProcessorOptions =
    | OkhslHueShiftProcessorOptions
    | OkhslHueShiftRotateProcessorOptions
    | OkhslLightnessBezierProcessorOptions
    | OkhslLightnessLinearProcessorOptions
    | OkhslLightnessQuadProcessorOptions
    | OkhslLightnessCubeProcessorOptions
    | OkhslSaturationProcessorOptions

const PROCESSOR_MAP = {
    OkhslHueShiftProcessor: OkhslHueShiftProcessor,
    OkhslHueShiftRotateProcessor: OkhslHueShiftRotateProcessor,
    OkhslLightnessBezierProcessor: OkhslLightnessBezierProcessor,
    OkhslLightnessLinearProcessor: OkhslLightnessLinearProcessor,
    OkhslLightnessQuadProcessor: OkhslLightnessQuadProcessor,
    OkhslLightnessCubeProcessor: OkhslLightnessCubeProcessor,
    OkhslSaturationProcessor: OkhslSaturationProcessor,
}

export function getProcessor (type: ProcessorType) {
    return PROCESSOR_MAP[type]
}

const PROCESSOR_DEFAULT_VALUE_FN = {
    OkhslHueShiftProcessor: getDefaultOkhslHueShiftProcessorValue,
    OkhslHueShiftRotateProcessor: getDefaultOkhslHueShiftRotateProcessorValue,
    OkhslLightnessBezierProcessor: getDefaultOkhslLightnessBezierProcessorValue,
    OkhslLightnessLinearProcessor: getDefaultOkhslLightnessLinearProcessorValue,
    OkhslLightnessQuadProcessor: getDefaultOkhslLightnessQuadProcessorValue,
    OkhslLightnessCubeProcessor: getDefaultOkhslLightnessCubeProcessorValue,
    OkhslSaturationProcessor: getDefaultOkhslSaturationProcessorValue,
}

export function getProcessorDefaultValue (type: ProcessorType) {
    return PROCESSOR_DEFAULT_VALUE_FN[type]
}
