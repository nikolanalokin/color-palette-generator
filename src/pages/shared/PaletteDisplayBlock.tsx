import styled from '@emotion/styled'
import { PaletteInfo, ShadeInfo } from '../../core'
import { Checkbox } from '../../components/inputs/Checkbox'
import { useState } from 'react'
import { formatHsl, formatOkhsl } from './format-utils'
import { keyframes } from '@emotion/react'
import { paletteToBlob } from '../../utils/paletteToImage'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components'

export type PaletteDisplayBlockProps = {
    palette?: PaletteInfo
}

export const PaletteDisplayBlock = (props: PaletteDisplayBlockProps) => {
    const { palette } = props
    const [highlight, setHighlight] = useState(false)
    const [copied, setCopied] = useState(false)
    const handlePaletteClick = (evt: React.MouseEvent<HTMLDivElement>) => {
        paletteToBlob(palette)
            .then(blob => {
                return window.navigator.clipboard.write([
                    new ClipboardItem({ [blob.type]: blob })
                ])
            })
            .then(() => {
                setCopied(true)

                setTimeout(() => {
                    setCopied(false)
                }, 1000)
            })
    }
    return (
        <PaletteDisplayBlockRoot>
            <PaletteScaleContainer>
                <HeaderScaleBlock>
                    <Checkbox
                        id="highlight"
                        labelText="Подсветить наиболее близкий тон"
                        checked={highlight}
                        onChange={setHighlight}
                    />
                </HeaderScaleBlock>

                <PaletteScale data-copied={copied} onClick={handlePaletteClick}>
                    { palette.shades.map((shade) => {
                        const color = Math.abs(shade.apca.blackOn) > Math.abs(shade.apca.whiteOn) ? 'black' :'white'
                        const tooltipData = createRow(shade)
                        return (
                            <Tooltip placement="right">
                                <TooltipTrigger asChild>
                                    <ScaleBlock
                                        key={shade.number}
                                        css={{ color, backgroundColor: shade.hex }}
                                        data-highlight={highlight && palette.nearestShade.number === shade.number}
                                    >
                                        { shade.number }
                                    </ScaleBlock>
                                </TooltipTrigger>

                                <TooltipContent>
                                    { columns.map(column => (
                                        <div key={`${shade.number}:${column.key}`}>
                                            <b>
                                                { column.label }
                                            </b>
                                            <span>: </span>
                                            <span>
                                                { tooltipData[column.key] }
                                            </span>
                                        </div>
                                    )) }
                                </TooltipContent>
                            </Tooltip>
                        )
                    }) }
                </PaletteScale>
            </PaletteScaleContainer>
            <PaletteInfoContainer>
                <Table>
                    <thead>
                        <TableRow>
                            { columns.map(column => {
                                return (
                                    <TableHeaderCell key={column.key}>
                                        <HeaderCell>
                                            { column.label }
                                        </HeaderCell>
                                    </TableHeaderCell>
                                )
                            }) }
                        </TableRow>
                    </thead>
                    <tbody>
                        { palette.shades.map((shade) => {
                            const row = createRow(shade)
                            return (
                                <TableRow key={shade.number}>
                                    { columns.map(column => (
                                        <TableDataCell key={`${shade.number}:${column.key}`}>
                                            <Cell>
                                                { row[column.key] }
                                            </Cell>
                                        </TableDataCell>
                                    )) }
                                </TableRow>
                            )
                        }) }
                    </tbody>
                </Table>
            </PaletteInfoContainer>
        </PaletteDisplayBlockRoot>
    )
}

const createRow = (shade: ShadeInfo) => {
    return {
        hex: shade.hex,
        wcag: `${ shade.wcag.onBlack.toFixed(2) }/${ shade.wcag.onWhite.toFixed(2) }`,
        apca: `${ shade.apca.onBlack.toFixed(1) }/${ shade.apca.onWhite.toFixed(1) }`,
        hsl: formatHsl(shade.hsl),
        okhsl: formatOkhsl(shade.okhsl),
        deltaE: shade.delta.toPrecision(4),
    }
}

const columns = [
    {
        key: 'hex',
        label: 'HEX',
    },
    {
        key: 'wcag',
        label: 'WCAG',
    },
    {
        key: 'apca',
        label: 'APCA',
    },
    {
        key: 'okhsl',
        label: 'OKHSL',
    },
    {
        key: 'deltaE',
        label: 'deltaE',
    },
]

const PaletteDisplayBlockRoot = styled.div(
    ({}) => ({
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '24px',
    })
)

const PaletteScaleContainer = styled.div({})

const copyAnimationKeyframes = keyframes`
    0% {
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    }
    90% {
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.16);
    }
    100% {
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
    }
`

const PaletteScale = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
        cursor: 'pointer',

        '&[data-copied="true"]': {
            animation: `${copyAnimationKeyframes} 1s`
        }
    })
)

const HeaderScaleBlock = styled.div(
    ({}) => ({
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        paddingInline: '16px',
    })
)

const ScaleBlock = styled.div(
    ({}) => ({
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        paddingInline: '16px',

        '&:first-of-type': {
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
        },

        '&:last-of-type': {
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
        },

        '&[data-highlight="true"]': {
            zIndex: 1,
            boxShadow: '0 0 0 1px white, 0 0 0 3px black',
        },
    })
)

const PaletteInfoContainer = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
    })
)

const Table = styled.table(
    ({}) => ({
        borderCollapse: 'collapse',
        borderSpacing: 0,
    })
)

const TableRow = styled.tr(
    ({}) => ({

    })
)

const TableHeaderCell = styled.th(
    ({}) => ({
        padding: 0,
    })
)

const TableDataCell = styled.td(
    ({}) => ({
        padding: 0,
    })
)

const Column = styled.div(
    ({}) => ({

    })
)

const Cell = styled.div(
    ({}) => ({
        display: 'flex',
        alignItems: 'center',
        height: '48px',
        paddingInline: '8px',
        flexGrow: 1,
        flexBasis: 0,
    })
)

const HeaderCell = styled(Cell)(
    ({}) => ({
        height: '64px',
    })
)
