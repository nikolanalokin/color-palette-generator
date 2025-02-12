import { combine, createEffect, createEvent, createStore } from 'effector'
import { Okhsl } from 'culori'
import { storage } from '../services/storage'
import { ShadeInfo } from '../core'
import { CommonPaletteSettingsVO, PaletteVO } from '../types'
import { $templates } from './template'
import { getNextId } from '../utils/getNextId'

export const addPalette = createEvent<PaletteVO>()
export const updatePalette = createEvent<PaletteVO>()
export const removePalette = createEvent<PaletteVO>()
export const copyPalette = createEvent<PaletteVO>()

export const $palettes = createStore<PaletteVO[]>(storage.get('palettes') || [])
    .on(addPalette, (state, payload) => {
        return state.concat(payload)
    })
    .on(copyPalette, (state, payload) => {
        return state.concat({
            ...payload,
            id: state.length > 0 ? String(Math.max(...state.map(p => +p.id)) + 1) : '1',
        })
    })
    .on(updatePalette, (state, payload) => {
        const palettesCopy = [...state]
        const pIndex = palettesCopy.findIndex(p => p.id === payload.id)
        palettesCopy[pIndex] = payload
        return palettesCopy
    })
    .on(removePalette, (state, payload) => {
        return state.filter(p => p.id !== payload.id)
    })

$palettes.watch(state => storage.set('palettes', state))
$palettes.watch(payload => console.log('watch $palettes', payload))

export const setEditedPalette = createEvent<PaletteVO>()

export const getPaletteFx = createEffect(({ paletteId }) => {
    if (paletteId) {
        const p = storage.get('palettes').find(palette => palette.id === paletteId)
        if (p) return p
        else throw new Error('Not found')
    } else {
        throw new Error('Not found')
    }
})

export const $editedPalette = createStore<PaletteVO>(null)
    .on(setEditedPalette, (_, payload) => payload)
    .on(getPaletteFx.doneData, (_, payload) => payload)
    .on(getPaletteFx.fail, () => createDefaultPalette())

export function createDefaultColor (): Okhsl {
    return {
        mode: 'okhsl',
        h: 25,
        s: .9,
        l: .5,
    }
}

export function createDefaultPalette (): PaletteVO {
    return {
        id: null,
        name: '',
        templateId: null,
        inputColor: createDefaultColor(),
        scale: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
        generator: 'OkhslScalePaletteGenerator',
        processors: [],
    }
}

export function createDefaultCommonPaletteSettings (): CommonPaletteSettingsVO {
    return {
        scale: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
        generator: 'OkhslScalePaletteGenerator',
        processors: [],
    }
}
