import { getDefaultOkhslHueShiftProcessorValue, OkhslHueShiftProcessor, OkhslHueShiftProcessorOptions } from './OkhslHueShiftProcessor'
import { getDefaultOkhslHueShiftRotateProcessorValue, OkhslHueShiftRotateProcessor, OkhslHueShiftRotateProcessorOptions } from './OkhslHueShiftRotateProcessor'
import { getDefaultOkhslLightnessBezierProcessorValue, OkhslLightnessBezierProcessor, OkhslLightnessBezierProcessorOptions } from './OkhslLightnessBezierProcessor'
import { getDefaultOkhslLightnessLinearProcessorValue, OkhslLightnessLinearProcessor, OkhslLightnessLinearProcessorOptions } from './OkhslLightnessLinearProcessor'
import { getDefaultOkhslSaturationProcessorValue, OkhslSaturationProcessor, OkhslSaturationProcessorOptions } from './OkhslSaturationProcessor'

export type ProcessorType =
    | 'OkhslHueShiftProcessor'
    | 'OkhslHueShiftRotateProcessor'
    | 'OkhslLightnessBezierProcessor'
    | 'OkhslLightnessLinearProcessor'
    | 'OkhslSaturationProcessor'

export type ProcessorOptions =
    | OkhslHueShiftProcessorOptions
    | OkhslHueShiftRotateProcessorOptions
    | OkhslLightnessBezierProcessorOptions
    | OkhslLightnessLinearProcessorOptions
    | OkhslSaturationProcessorOptions

const PROCESSOR_MAP = {
    OkhslHueShiftProcessor: OkhslHueShiftProcessor,
    OkhslHueShiftRotateProcessor: OkhslHueShiftRotateProcessor,
    OkhslLightnessBezierProcessor: OkhslLightnessBezierProcessor,
    OkhslLightnessLinearProcessor: OkhslLightnessLinearProcessor,
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
    OkhslSaturationProcessor: getDefaultOkhslSaturationProcessorValue,
}

export function getProcessorDefaultValue (type: ProcessorType) {
    return PROCESSOR_DEFAULT_VALUE_FN[type]
}
