import { Okhsl } from 'culori'
import { HueShiftOptions, PaletteInfo } from '../core'

export type AppSet = {
    id: string
    name: string
    palettes: string[]
}

export type AppPalette = {
    id: string
    name: string
    color: Okhsl
    options: PaletteOptions
    palette: PaletteInfo
}

export type PaletteOptions = {
    scale: number[]
    method: 'lightness' | 'contrast'
    lightnessFuncton?: 'linear' | 'bezier'
    hueShift?: HueShiftOptions
    decreaseSaturationRatio?: number
}
