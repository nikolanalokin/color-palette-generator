import { combine, createEvent, createStore } from 'effector'
import { $editedPalette } from './palette'

export const setThemeTone = createEvent<number>()

export const $themeTone = createStore<number>(null)
    .on(setThemeTone, (_, payload) => payload)

// export const $themeShade = combine(
//     [$themeTone, $editedPalette],
//     ([themeTone, editedPalette]) => editedPalette?.palette.shades.find(shade => shade.number === themeTone) || null
// )
