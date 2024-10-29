import { useState } from 'react'
import { Meta } from '@storybook/react'
import './algorithm.stories.css'
import { createPaletteWithTailwindReference } from './createPaletteWithTailwindReference'
import { createPalette } from './createPalette'
import { formatHex, Hsl, hsl, Okhsl, okhsl, wcagContrast } from 'culori'
import { Palette as TPalette, ShadeInfo } from './types'
import { ConvertFn } from 'culori/src/converter'
import { contrastAPCA } from './utils'

const meta: Meta = {
    title: 'PaletteUtils/CreatePaletteFunctions',
    parameters: {
        layout: 'padded',
    },
}

export default meta

export const ReferenceMethodExample = () => {
    const [apca, setApca] = useState(false)
    return (
        <div className="content">
            <label>
                <input type="checkbox" checked={apca} onChange={evt => setApca(evt.target.checked)} />
                Использовать алгоритм подстройки под коэфициенты контрастности APCA
            </label>

            <Palette palette={createPaletteWithTailwindReference('#e61919', apca)} />
            <Palette palette={createPaletteWithTailwindReference('#e68019', apca)} />
            <Palette palette={createPaletteWithTailwindReference('#e5e619', apca)} />
            <Palette palette={createPaletteWithTailwindReference('#80e619', apca)} />
            <Palette palette={createPaletteWithTailwindReference('#19e619', apca)} />
            <Palette palette={createPaletteWithTailwindReference('#19e680', apca)} />
            <Palette palette={createPaletteWithTailwindReference('#19e5e6', apca)} />
            <Palette palette={createPaletteWithTailwindReference('#197fe6', apca)} />
            <Palette palette={createPaletteWithTailwindReference('#1919e6', apca)} />
            <Palette palette={createPaletteWithTailwindReference('#7f19e6', apca)} />
            <Palette palette={createPaletteWithTailwindReference('#e619e5', apca)} />
            <Palette palette={createPaletteWithTailwindReference('#e61980', apca)} />
        </div>
    )
}

const ANOTHER_SCALE = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

export const Playground = () => {
    const [method, setMethod] = useState('okhsl')
    const parser = (method === 'okhsl' ? okhsl : hsl) as ConvertFn<"hsl">
    const [color, setColor] = useState<Okhsl | Hsl>(parser('#d03531'))
    const [apca, setApca] = useState(true)
    const createPaletteFn = {
        reference: createPaletteWithTailwindReference,
        okhsl: createPalette,
    }[method]
    const hexColor = formatHex(color)
    let palette = createPaletteFn(hexColor, apca)
    const hue = color.h
    const handleHueChange = (value: number) => setColor(prevColor => ({ ...prevColor, h: value, }))
    const saturation = color.s * 100
    const handleSaturationChange = (value: number) => setColor(prevColor => ({ ...prevColor, s: value / 100, }))
    const lightness = color.l * 100
    const handleLightnessChange = (value: number) => setColor(prevColor => ({ ...prevColor, l: value / 100, }))
    return (
        <div className="content">
            <div className="filter-container">
                <div className="color-input">
                    <input type="color" value={hexColor} onChange={evt => {
                        setColor(parser(evt.target.value))
                    }} />
                </div>
                <div className="col">
                <div className="text-input input-container">
                    <label htmlFor="color">Входной цвет</label>
                    <input
                        type="text"
                        id="color"
                        value={hexColor}
                        onChange={evt => {
                            setColor(parser(evt.target.value))
                        }}
                    />
                </div>
                <div className="range-input input-container">
                    <label htmlFor="hue">
                        <span>Hue</span>
                        <span>{ hue }</span>
                    </label>
                    <input
                        id="hue"
                        type="range"
                        value={hue}
                        min={0}
                        max={360}
                        step={1}
                        onChange={evt => handleHueChange(+evt.target.value)}
                    />
                </div>
                <div className="range-input input-container">
                    <label htmlFor="saturation">
                        <span>Saturation</span>
                        <span>{ saturation }</span>
                    </label>
                    <input
                        id="saturation"
                        type="range"
                        value={saturation}
                        min={0}
                        max={100}
                        step={1}
                        onChange={evt => handleSaturationChange(+evt.target.value)}
                    />
                </div>
                <div className="range-input input-container">
                    <label htmlFor="lightness">
                        <span>Lightness</span>
                        <span>{ lightness }</span>
                    </label>
                    <input
                        id="lightness"
                        type="range"
                        value={lightness}
                        min={0}
                        max={100}
                        step={1}
                        onChange={evt => handleLightnessChange(+evt.target.value)}
                    />
                </div>
                <div className="select-input input-container">
                    <label htmlFor="method">Метод генерации</label>
                    <select
                        id="method"
                        value={method}
                        onChange={evt => setMethod(evt.target.value)}
                    >
                        <option value="reference">На основе референсных палитр</option>
                        <option value="okhsl">Посредством ц.п. OKHSL</option>
                    </select>
                </div>
                <div className="chechbox-input input-container">
                    <input type="checkbox" id="apca" checked={apca} onChange={evt => setApca(evt.target.checked)} />
                    <label htmlFor="apca">Использовать алгоритм подстройки под коэфициенты контрастности APCA</label>
                </div>
                </div>
            </div>

            { palette ? (
                <>
                    <Palette palette={palette} />
                    <ContrastTable palette={palette} />
                    <code className="code-block">{JSON.stringify(palette.shades.map(shade => shade.hex))}</code>
                    <code className="code-block">{JSON.stringify(palette, null, '  ')}</code>
                </>
            ) : null }
        </div>
    )
}

const Palette = ({ palette }) => {
    return (
        <div className="grid">
            {/* <ColorRect color={palette.input.hex} titleText="Base color" labelText={palette.input.hex} /> */}

            <div
                className="gradient"
                style={{ background: `linear-gradient(to right, ${palette.shades.map((shade, i, arr) => `${shade.hex} ${shade.number / arr.at(-1).number * 100}%`).join(', ')})` }}
            />

            <div className="row palette-row">
                {palette.shades.map((shade) => (
                    <ColorRect
                        key={shade.number}
                        shade={shade}
                        color={shade.hex}
                        closest={shade.hex === palette.closestShade?.hex}
                    />
                ))}
            </div>
        </div>
    )
}

const ColorRect = (props: { color?: string, shade?: ShadeInfo, closest?: boolean }) => {
    if (!props.color) return
    const { color, shade, closest } = props
    let wcagBlack = wcagContrast(color, 'black')
    let wcagWhite = wcagContrast(color, 'white')
    let apcaBlack = contrastAPCA('black', color)
    let apcaWhite = contrastAPCA('white', color)
    let textColor = Math.abs(apcaBlack) > 60 ? 'black' : Math.abs(apcaWhite) > 60 ? 'white' : '#808080'
    return (
        <div className="rect-wrapper">
            <div
                className="rect"
                data-locked={closest}
                {...props}
                style={{ backgroundColor: color }}
                onClick={() => writeClipboardText(color)}
            >
                <div className="title" style={{ color: textColor }}>{ shade.number }</div>
            </div>
            <div className="rect-label">
                <div className="title">{ shade.number }</div>
                <div className="subtitle">{ shade.hex }</div>
                <div className="caption">
                    WCAG { wcagBlack.toFixed(2) }/{ wcagWhite.toFixed(2) }
                </div>
                <div className="caption">
                    APCA { apcaBlack.toFixed(1) }/{ apcaWhite.toFixed(1) }
                </div>
                <div className="caption">
                    HSL { shade.hsl.hue } { shade.hsl.saturation } { shade.hsl.lightness }
                </div>
                <div className="caption">
                    OKHSL { shade.okhsl.hue } { shade.okhsl.saturation } { shade.okhsl.lightness }
                </div>
                <div className="caption">
                    deltaE { shade.delta.toPrecision(4) }
                </div>
            </div>
        </div>
    )
}

const ContrastTable = (props: { palette: TPalette }) => {
    const shades = props.palette.shades
    const [method, setMethod] = useState('apca')
    const [level, setLevel] = useState('all')
    const [wcag, setWcag] = useState(false)
    const contrast = method === 'apca' ? contrastAPCA : wcagContrast
    const [mousePos, setMousePos] = useState({ col: null, row: null })
    const handleMouseEnter = (evt: React.MouseEvent<HTMLTableCellElement>) => {
        if (evt.currentTarget) {
            const { col, row } = evt.currentTarget.dataset
            setMousePos({
                col: +col,
                row: +row,
            })
        }
    }
    const handleMouseLeave = () => {
        setMousePos({ col: null, row: null })
    }
    return (
        <>
            <style>
                { mousePos.col !== null && mousePos.row !== null ? `
                    .contrast-table tbody tr:nth-of-type(${mousePos.row + 1}) td .contrast-cell {
                        box-shadow: 0 0 0 1px white, 0 0 0 2px rgba(0, 0, 0, 0.5);
                    }
                    .contrast-table tbody tr td:nth-of-type(${mousePos.col + 1}) .contrast-cell {
                        box-shadow: 0 0 0 1px white, 0 0 0 2px rgba(0, 0, 0, 0.5);
                    }
                ` : null }
            </style>
            <div className="table-filter-container">
                <div className="select-input input-container">
                    <label htmlFor="method">Метод расчёта контрастности</label>
                    <select
                        id="method"
                        value={method}
                        onChange={evt => setMethod(evt.target.value)}
                    >
                        <option value="apca">APCA</option>
                        <option value="wcag">WCAG</option>
                    </select>
                </div>
                <div className="select-input input-container">
                    <label htmlFor="level">Допустимый уровень контрастности</label>
                    <select
                        id="level"
                        value={level}
                        onChange={evt => setLevel(evt.target.value)}
                    >
                        <option value="all">Все уровни</option>
                        <option value="AA">{ {
                            apca: '60+',
                            wcag: '4.5+ (AA)',
                        }[method] }</option>
                        <option value="AAA">{ {
                            apca: '75+',
                            wcag: '7+ (AAA)',
                        }[method] }</option>
                    </select>
                </div>
            </div>
            <table className="contrast-table">
                <thead>
                    <tr>
                        <th></th>
                        { shades.map(shadeV => (
                            <th>
                                <div className="contrast-th vert">
                                    { shadeV.number }
                                </div>
                            </th>
                        )) }
                    </tr>
                </thead>
                <tbody onMouseLeave={handleMouseLeave}>
                    { shades.map((shadeH, rowIndex) => (
                        <tr>
                            <th>
                                <div className="contrast-th horiz">
                                    { shadeH.number }
                                </div>
                            </th>

                            { shades.map((shadeV, colIndex) => {
                                const score = contrast(shadeV.hex, shadeH.hex)
                                const show = method == 'apca'
                                    ? (level === 'AA' ? Math.abs(score) >= 60 : level === 'AAA' ? Math.abs(score) >= 75 : true)
                                    : (level === 'AA' ? score >= 4.5 : level === 'AAA' ? score >= 7 : true)
                                return (
                                    <td data-row={rowIndex} data-col={colIndex} onMouseEnter={handleMouseEnter}>
                                        { show ? (
                                            <div
                                                className="cell contrast-cell"
                                                style={{
                                                    backgroundColor: shadeH.hex,
                                                    color: shadeV.hex,
                                                }}
                                            >
                                                { score.toFixed(2) }
                                            </div>
                                        ) : <div className="cell placeholder-cell"></div> }
                                    </td>
                                )
                            }) }
                        </tr>
                    )) }
                </tbody>
            </table>
        </>
    )
}

async function writeClipboardText (text: string) {
    try {
        await navigator.clipboard.writeText(text)
    } catch (error) {
        console.error(error.message)
    }
}
