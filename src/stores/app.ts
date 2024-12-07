import { create } from 'zustand'
import { storage } from '../services/storage'
import { PaletteInfo } from '../core'

export type PaletteOptions = {
    method: 'lightness' | 'contrast'
    lightnessFuncton?: 'linear' | 'bezier'
    hueShift?: number
    decreaseSaturationRatio?: number
}

export type AppPalette = {
    id: string
    name: string
    color: string
    options: PaletteOptions
    palette: PaletteInfo
}

export const useAppStore = create<{
    palettes: AppPalette[]
    editedPalette: AppPalette
}>(() => ({
    palettes: storage.get('palettes') || [],
    editedPalette: null,
}))

export function setEditedPalette (palette: AppPalette | null) {
    useAppStore.setState(state => ({ editedPalette: palette }))
}

export function addPalette (palette: AppPalette) {
    console.log('addPalette')
    useAppStore.setState(state => ({ palettes: state.palettes.concat({
        ...palette,
        id: String(state.palettes.length),
    }) }))
    storage.set('palettes', useAppStore.getState().palettes)
}

export function updatePalette (palette: AppPalette) {
    console.log('updatePalette')
    useAppStore.setState(state => {
        const palettesCopy = [...state.palettes]
        const pIndex = palettesCopy.findIndex(p => p.id === palette.id)
        palettesCopy[pIndex] = palette
        return { palettes: palettesCopy }
    })
    storage.set('palettes', useAppStore.getState().palettes)
}

export function removePalette (palette: AppPalette) {
    console.log('removePalette')
    useAppStore.setState(state => {
        return { palettes: state.palettes.filter(p => p.id !== palette.id) }
    })
    storage.set('palettes', useAppStore.getState().palettes)
}
