import { Color, Mode, Okhsl } from 'culori'
import { HueShiftOptions, PaletteInfo } from '../core'

export type SetVO = {
    id: string
    name: string
    palettes: string[]
}

export type PaletteVO = {
    id: string
    name: string
    color: Okhsl
    colorSpace: Mode
    options: PaletteOptionsVO
    palette: PaletteInfo
}

export type PaletteOptionsVO = {
    scale: number[]
    method: 'lightness' | 'contrast'
    lightnessFuncton?: 'linear' | 'bezier'
    hueShift?: HueShiftOptions
    decreaseSaturationRatio?: number
}

export type PaletteGenerationMethodVO = {
    type: PaletteGenerationMethodTypeVO
    options: PaletteGenerationMethodOptionsVO
}

export type PaletteGenerationMethodTypeVO = 'lightness' | 'contrast'

export type PaletteGenerationMethodOptionsVO = {}

export type TemplateVO = {
    id: string
    name: string
    scale: number[]
    method: PaletteGenerationMethodVO
    preprocessings: ProcessingVO[]
    postprocessings: ProcessingVO[]
}

export type ProcessingVO = {
    channel: Omit<Color, 'mode'>
    type: ProcessingTypeVO
    options: ProcessingOptionsVO
}

export type ProcessingTypeVO = ''

export type ProcessingOptionsVO = {

}
