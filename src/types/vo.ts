import { GeneratorType, PaletteInfo, ProcessorOptions, ProcessorType } from '../astral'
import { RequiredProps } from './utils'

type PaletteResultVO = PaletteInfo

export type CommonPaletteSettingsVO = {
    scale?: number[]
    generator?: GeneratorType
    processors?: ProcessorVO[]
}

export type ProcessorVO = {
    type: ProcessorType
    options: ProcessorOptions | null
}

/* --- Палитры --- */
export type CommonPaletteVO = RequiredProps<Partial<PaletteResultVO>, 'inputColor'> & {
    id: string
    name?: string
}

export type PaletteVO = TemplatePaletteVO & IndependentPaletteVO

export type TemplatePaletteVO = CommonPaletteVO & {
    templateId?: string
}

export type IndependentPaletteVO = CommonPaletteVO & CommonPaletteSettingsVO

/* --- Наборы --- */
export type CommonSetVO = {
    id: string
    name?: string
}

export type SetVO = TemplateSetVO & ManualSetVO

export type TemplateSetVO = CommonSetVO & {
    colors?: string[]
    templateId?: string
    paletteIds?: string[]
}

export type ManualSetVO = CommonSetVO & {
    paletteIds?: string[]
}

/* --- Шаблоны --- */
export type CommonTemplateVO = {
    id: string
    name?: string
}

export type TemplateVO = CommonTemplateVO & CommonPaletteSettingsVO
