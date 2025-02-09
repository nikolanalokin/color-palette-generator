import { ProcessorType } from '../../astral'
import { OkhslHueShiftProcessorForm } from './OkhslHueShiftProcessorForm'
import { OkhslHueShiftRotateProcessorForm } from './OkhslHueShiftRotateProcessorForm'
import { OkhslLightnessBezierProcessorForm } from './OkhslLightnessBezierProcessorForm'
import { OkhslLightnessLinearProcessorForm } from './OkhslLightnessLinearProcessorForm'
import { OkhslSaturationProcessorForm } from './OkhslSaturationProcessorForm'

export function getProcessorForm (processorType: ProcessorType) {
    return {
        OkhslHueShiftProcessor: OkhslHueShiftProcessorForm,
        OkhslHueShiftRotateProcessor: OkhslHueShiftRotateProcessorForm,
        OkhslLightnessBezierProcessor: OkhslLightnessBezierProcessorForm,
        OkhslLightnessLinearProcessor: OkhslLightnessLinearProcessorForm,
        OkhslSaturationProcessor: OkhslSaturationProcessorForm,
    }[processorType]
}
