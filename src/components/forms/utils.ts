import { ProcessorType } from '../../astral'
import { OkhslHueShiftProcessorForm } from './OkhslHueShiftProcessorForm'
import { OkhslHueShiftRotateProcessorForm } from './OkhslHueShiftRotateProcessorForm'
import { OkhslLightnessBezierProcessorForm } from './OkhslLightnessBezierProcessorForm'
import { OkhslLightnessCubeProcessorForm } from './OkhslLightnessCubeProcessorForm'
import { OkhslLightnessLinearProcessorForm } from './OkhslLightnessLinearProcessorForm'
import { OkhslLightnessQuadProcessorForm } from './OkhslLightnessQuadProcessorForm'
import { OkhslSaturationProcessorForm } from './OkhslSaturationProcessorForm'

export function getProcessorForm (processorType: ProcessorType) {
    return {
        OkhslHueShiftProcessor: OkhslHueShiftProcessorForm,
        OkhslHueShiftRotateProcessor: OkhslHueShiftRotateProcessorForm,
        OkhslLightnessBezierProcessor: OkhslLightnessBezierProcessorForm,
        OkhslLightnessLinearProcessor: OkhslLightnessLinearProcessorForm,
        OkhslLightnessQuadProcessor: OkhslLightnessQuadProcessorForm,
        OkhslLightnessCubeProcessor: OkhslLightnessCubeProcessorForm,
        OkhslSaturationProcessor: OkhslSaturationProcessorForm,
    }[processorType]
}
