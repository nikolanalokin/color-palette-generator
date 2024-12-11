import { PaletteInfo } from '../core'
import { paletteToBlob } from '../utils/paletteToImage'

export async function copyPaletteToImage (palette: PaletteInfo) {
    const blob = await paletteToBlob(palette)
    return window.navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
    ])
}

export async function copyPaletteToSvg (palette: PaletteInfo) {
    const width = 300, height = 100
    const svg = `
        <svg width="${width}" height="${height * palette.shades.length}" viewBox="0 0 ${width} ${height * palette.shades.length}" fill="none" xmlns="http://www.w3.org/2000/svg">
            <style>
                .title {
                    font-size: 24px;
                    font-weight: 700;
                }
                .caption {
                    font-size: 16px;
                    font-weight: 500;
                }
            </style>
            <g>
                ${palette.shades.map((shade, index) => {
                    const textColor = shade.apca.blackOn >= 45 ? '#000000' : '#ffffff'
                    return `
                        <rect width="${width}" height="${height}" transform="translate(0 ${height * index})" fill="${shade.hex}"/>
                        <text x="24" y="45" transform="translate(0 ${height * index})" fill="${textColor}" class="title">${shade.number}</text>
                        <text x="24" y="75" transform="translate(0 ${height * index})" fill="${textColor}" class="caption">${shade.hex}</text>
                    `
                }).join('')}
            </g>
        </svg>
    `
    return window.navigator.clipboard.writeText(svg)
}
