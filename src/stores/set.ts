import { createEvent, createStore } from 'effector'
import { AppPalette } from './palette'
import { storage } from '../services/storage'

export type AppSet = {
    id: string
    name: string
    palettes: string[]
}

export const addAppSet = createEvent<AppSet>()
export const updateAppSet = createEvent<AppSet>()
export const removeAppSet = createEvent<AppSet>()
export const copyAppSet = createEvent<AppSet>()

export const $appSets = createStore<AppSet[]>(storage.get('sets') || [])
    .on(addAppSet, (state, payload) => {
        return state.concat({
            ...payload,
            id: state.length > 0 ? String(Math.max(...state.map(p => +p.id)) + 1) : '1',
        })
    })
    .on(copyAppSet, (state, payload) => {
        return state.concat({
            ...payload,
            id: state.length > 0 ? String(Math.max(...state.map(p => +p.id)) + 1) : '1',
        })
    })
    .on(updateAppSet, (state, payload) => {
        const setsCopy = [...state]
        const pIndex = setsCopy.findIndex(p => p.id === payload.id)
        setsCopy[pIndex] = payload
        return setsCopy
    })
    .on(removeAppSet, (state, payload) => {
        return state.filter(p => p.id !== payload.id)
    })

$appSets.watch(state => storage.set('sets', state))

export const setEditedAppSet = createEvent<AppSet>()

export const $editedAppSet = createStore<AppSet>(null)
    .on(setEditedAppSet, (_, payload) => payload)

export function createDefaultAppSet (): AppSet {
    return {
        id: null,
        name: '',
        palettes: [],
    }
}
