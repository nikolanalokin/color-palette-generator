import { Okhsl } from 'culori'
import { PaletteInfo, ProcessorOptions, ProcessorType } from '../astral'

export type PaletteResultVO = PaletteInfo

export type CommonPaletteSettingsVO = {
    scale: number[]
    generator?: any
    processors: ProcessorVO[]
}

export type ProcessorVO = {
    type: ProcessorType
    options: ProcessorOptions | null
}

/* --- Палитры --- */
export type CommonPaletteVO = {
    id: string
    name: string
    color: Okhsl // ?
}

export type PaletteVO = TemplatePaletteVO | IndependentPaletteVO

export type TemplatePaletteVO = CommonPaletteVO & {
    templateId: string
}

export type DetailedTemplatePaletteVO = TemplatePaletteVO & {
    result: PaletteResultVO
}

export type IndependentPaletteVO = CommonPaletteVO & CommonPaletteSettingsVO

export type DetailedIndependentPaletteVO = IndependentPaletteVO & {
    result: PaletteResultVO
}

export type DetailedPaletteVO = DetailedTemplatePaletteVO | DetailedIndependentPaletteVO

/* --- Наборы --- */
export type CommonSetVO = {
    id: string
    name: string
}

export type SetVO = TemplateSetVO | ManualSetVO

export type TemplateSetVO = CommonSetVO & {
    templateId: string
    colors: string[]
}

export type DetailedTemplateSetVO = TemplateSetVO & {
    palettes: DetailedTemplatePaletteVO[]
}

export type ManualSetVO = CommonSetVO & {
    paletteIds: string[]
}

/* --- Шаблоны --- */
export type CommonTemplateVO = {
    id: string
    name: string
}

export type TemplateVO = CommonTemplateVO & CommonPaletteSettingsVO
