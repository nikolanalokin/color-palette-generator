import { createEvent, createStore } from 'effector'
import { storage } from '../services/storage'
import { SetVO } from '../types'

export const addSet = createEvent<SetVO>()
export const updateSet = createEvent<SetVO>()
export const removeSet = createEvent<SetVO>()
export const copySet = createEvent<SetVO>()

export const $sets = createStore<SetVO[]>(storage.get('sets') || [])
    .on(addSet, (state, payload) => {
        return state.concat(payload)
    })
    .on(copySet, (state, payload) => {
        return state.concat({
            ...payload,
            id: state.length > 0 ? String(Math.max(...state.map(p => +p.id)) + 1) : '1',
        })
    })
    .on(updateSet, (state, payload) => {
        const setsCopy = [...state]
        const pIndex = setsCopy.findIndex(p => p.id === payload.id)
        setsCopy[pIndex] = payload
        return setsCopy
    })
    .on(removeSet, (state, payload) => {
        return state.filter(p => p.id !== payload.id)
    })

$sets.watch(state => storage.set('sets', state))
$sets.watch(payload => console.log('watch $sets', payload))

export const setEditedSet = createEvent<SetVO>()

export const $editedSet = createStore<SetVO>(null)
    .on(setEditedSet, (_, payload) => payload)

export function createDefaultSet (): SetVO {
    return {
        id: null,
        name: '',
        colors: [],
        templateId: null,
        paletteIds: [],
    }
}
