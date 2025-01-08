import { Color } from 'culori'
import { createPalette, PaletteFnProps } from './createPalette'
import { SetInfo } from './types'
import { uniqueId } from './utils'

export type SetFnProps = PaletteFnProps & {
    name?: string
}

export function createSet (inputColors: Array<string | Color>, props: SetFnProps): SetInfo {
    const {
        name,
        ...restProps
    } = props || {}
    const palettes = inputColors.map(color => createPalette(color, restProps))
    return {
        id: uniqueId(),
        name: props.name,
        palettes,
    }
}
