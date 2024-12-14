import { combine, createEvent, createStore } from 'effector'
import { Okhsl } from 'culori'
import { storage } from '../services/storage'
import { HueShiftOptions, PaletteInfo, ShadeInfo } from '../core'

export type PaletteOptions = {
    scale: number[]
    method: 'lightness' | 'contrast'
    lightnessFuncton?: 'linear' | 'bezier'
    hueShift?: HueShiftOptions
    decreaseSaturationRatio?: number
}

export type AppPalette = {
    id: string
    name: string
    color: Okhsl
    options: PaletteOptions
    palette: PaletteInfo
}

export const addAppPalette = createEvent<AppPalette>()
export const updateAppPalette = createEvent<AppPalette>()
export const removeAppPalette = createEvent<AppPalette>()

export const $appPalettes = createStore<AppPalette[]>(storage.get('palettes') || [])
    .on(addAppPalette, (state, payload) => {
        return state.concat({
            ...payload,
            id: state.length > 0 ? String(Math.max(...state.map(p => +p.id)) + 1) : '1',
        })
    })
    .on(updateAppPalette, (state, payload) => {
        const palettesCopy = [...state]
        const pIndex = palettesCopy.findIndex(p => p.id === payload.id)
        palettesCopy[pIndex] = payload
        return palettesCopy
    })
    .on(removeAppPalette, (state, payload) => {
        return state.filter(p => p.id !== payload.id)
    })

$appPalettes.watch(state => storage.set('palettes', state))

export const setEditedAppPalette = createEvent<AppPalette>()

export const $editedPalette = createStore<AppPalette>(null)
    .on(setEditedAppPalette, (_, payload) => payload)

export const $editedPaletteShadesMap = $editedPalette.map<Map<number, ShadeInfo>>(
    p => p?.palette.shades.reduce((acc, shade) => acc.set(shade.number, shade), new Map()) ?? new Map()
)

export const setThemeTone = createEvent<number>()

export const $themeTone = createStore<number>(null)
    .on(setThemeTone, (_, payload) => payload)

export const $themeShade = combine(
    [$themeTone, $editedPalette],
    ([themeTone, editedPalette]) => editedPalette?.palette.shades.find(shade => shade.number === themeTone) || null
)
