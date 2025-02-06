import { createEvent, createStore } from 'effector'
import { storage } from '../services/storage'
import { ProcessorOptions, ProcessorType } from '../core_v2'

export type Template = {
    id: string
    name: string
    processors: TemplateProcessor[]
}

export type TemplateProcessor = {
    type: ProcessorType
    options: ProcessorOptions | null
}

export const addTemplate = createEvent<Template>()
export const updateTemplate = createEvent<Template>()
export const removeTemplate = createEvent<Template>()
export const copyTemplate = createEvent<Template>()

export const $templates = createStore<Template[]>(storage.get('templates') || [])
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

export const setEditedTemplate = createEvent<Template>()

export const $editedTemplate = createStore<Template>(null)
    .on(setEditedTemplate, (_, payload) => payload)

export function createDefaultTemplate (): Template {
    return {
        id: null,
        name: '',
        processors: [],
    }
}


$templates.watch(state => console.debug('watch $templates', state))
$editedTemplate.watch(state => console.debug('watch $editedTemplate', state))
