import { Palette } from '../core'

export type PaletteToBlobOptions = {
    size?: number
    orientation?: 'horizontal' | 'vertical'
}

export function paletteToBlob (palette: Palette, opts: PaletteToBlobOptions = {}) {
    const { size = 50, orientation = 'vertical' } = opts
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = orientation === 'vertical' ? size : size * palette.shades.length
    canvas.height = orientation === 'horizontal' ? size : size * palette.shades.length
    palette.shades.forEach((shade, index) => {
        context.fillStyle = shade.hex
        context.fillRect(
            orientation === 'horizontal' ? size * index : 0,
            orientation === 'vertical' ? size * index : 0,
            size,
            size
        )
    })
    return new Promise<Blob>((res, rej) => {
        canvas.toBlob(blob => blob ? res(blob) : rej())
    })
}
