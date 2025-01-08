import { createEvent, createStore } from 'effector'
import { NavigateOptions, To } from 'react-router-dom'

export const setAppTitle = createEvent<string>()

export const $appTitle = createStore<string>('')
    .on(setAppTitle, (_, payload) => payload)

export const setBackOptions = createEvent<{
    to: To
    options?: NavigateOptions
}>()

export const $backOptions = createStore<{
    to: To
    options?: NavigateOptions
}>(null)
    .on(setBackOptions, (_, payload) => payload)
