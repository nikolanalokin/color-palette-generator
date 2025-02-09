import { createEvent, createStore } from 'effector'
import { storage } from '../services/storage'
import { TemplateVO } from '../types'

export const addTemplate = createEvent<TemplateVO>()
export const updateTemplate = createEvent<TemplateVO>()
export const removeTemplate = createEvent<TemplateVO>()
export const copyTemplate = createEvent<TemplateVO>()

export const $templates = createStore<TemplateVO[]>(storage.get('templates') || [])
    .on(addTemplate, (state, payload) => {
        return state.concat({
            ...payload,
            id: state.length > 0 ? String(Math.max(...state.map(p => +p.id)) + 1) : '1',
        })
    })
    .on(copyTemplate, (state, payload) => {
        return state.concat({
            ...payload,
            id: state.length > 0 ? String(Math.max(...state.map(p => +p.id)) + 1) : '1',
        })
    })
    .on(updateTemplate, (state, payload) => {
        const templatesCopy = [...state]
        const pIndex = templatesCopy.findIndex(p => p.id === payload.id)
        templatesCopy[pIndex] = payload
        return templatesCopy
    })
    .on(removeTemplate, (state, payload) => {
        return state.filter(p => p.id !== payload.id)
    })

$templates.watch(state => storage.set('templates', state))

export const setEditedTemplate = createEvent<TemplateVO>()

export const $editedTemplate = createStore<TemplateVO>(null)
    .on(setEditedTemplate, (_, payload) => payload)

export function createDefaultTemplate (): TemplateVO {
    return {
        id: null,
        name: '',
        scale: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
        generator: 'OkhslScalePaletteGenerator',
        processors: [],
    }
}


$templates.watch(state => console.debug('watch $templates', state))
$editedTemplate.watch(state => console.debug('watch $editedTemplate', state))
