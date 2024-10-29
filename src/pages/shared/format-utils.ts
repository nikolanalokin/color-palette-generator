import { Hsl, Okhsl } from 'culori'
import { round } from '../../core'

export const formatHsl = (value: Hsl) => {
    return `${round(value.h)} ${round(value.s)} ${round(value.l)}`
}

export const formatOkhsl = (value: Okhsl) => {
    return `${round(value.h)} ${round(value.s)} ${round(value.l)}`
}
