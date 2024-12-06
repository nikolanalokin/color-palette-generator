import { create } from 'zustand'
import { storage } from '../services/storage'
import { PaletteInfo } from '../core'

export const useAppStore = create<{
    palettes: PaletteInfo[]
    addPalette(palette: PaletteInfo): void
    // removePalette(paletteId: string): void
}>((set) => ({
    palettes: storage.get('palettes') || [],
    addPalette: (palette: PaletteInfo) => set((state) => ({ ...state, palettes: state.palettes.concat(palette) })),
    // removePalette: (paletteId: string) => set({ bears: 0 }),
}))
