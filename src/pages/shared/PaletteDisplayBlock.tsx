import styled from '@emotion/styled'
import { contrastAPCA, Palette, ShadeInfo } from '../../core'
import { PaletteColor } from './PaletteColor'
import { wcagContrast } from 'culori'
import { Checkbox } from '../../components/inputs/Checkbox'
import { useState } from 'react'

export type PaletteDisplayBlockProps = {
    palette?: Palette
}

export const PaletteDisplayBlock = (props: PaletteDisplayBlockProps) => {
    const { palette } = props
    const [highlight, setHighlight] = useState(false)
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

                <PaletteScale>
                    { palette.shades.map((shade) => {
                        const apcaBlack = contrastAPCA('black', shade.hexcode)
                        const apcaWhite = contrastAPCA('white', shade.hexcode)
                        const color = Math.abs(apcaBlack) > 60 ? 'black' : Math.abs(apcaWhite) > 60 ? 'white' : '#808080'
                        return (
                            <ScaleBlock
                                key={shade.number}
                                css={{ color, backgroundColor: shade.hexcode }}
                                data-highlight={highlight && palette.closestShade.number === shade.number}
                            >
                                { shade.number }
                            </ScaleBlock>
                        )
                    }) }
                </PaletteScale>
            </PaletteScaleContainer>
            <PaletteInfoContainer>
                <Grid>
                    <Row>
                        { columns.map(column => {
                            return (
                                <HeaderCell key={column.key}>
                                    { column.label }
                                </HeaderCell>
                            )
                        }) }
                    </Row>
                    { palette.shades.map((shade) => {
                        const row = createRow(shade)
                        return (
                            <Row
                                key={shade.number}
                            >
                                { columns.map(column => {

                                    return (
                                        <Cell key={`${shade.number}:${column.key}`}>
                                            { row[column.key] }
                                        </Cell>
                                    )
                                }) }
                            </Row>
                        )
                    }) }
                </Grid>
            </PaletteInfoContainer>
        </PaletteDisplayBlockRoot>
    )
}

const createRow = (shade: ShadeInfo) => {
    const wcagBlack = wcagContrast(shade.hexcode, 'black')
    const wcagWhite = wcagContrast(shade.hexcode, 'white')
    const apcaBlack = contrastAPCA('black', shade.hexcode)
    const apcaWhite = contrastAPCA('white', shade.hexcode)

    return {
        hex: shade.hexcode,
        wcag: `${ wcagBlack.toFixed(2) }/${ wcagWhite.toFixed(2) }`,
        apca: `${ apcaBlack.toFixed(1) }/${ apcaWhite.toFixed(1) }`,
        hsl: `${ shade.hsl.hue } ${ shade.hsl.saturation } ${ shade.hsl.lightness }`,
        okhsl: `${ shade.okhsl.hue } ${ shade.okhsl.saturation } ${ shade.okhsl.lightness }`,
        deltaE: `${ shade.delta.toPrecision(4) }`,
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
        key: 'hsl',
        label: 'HSL',
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

const PaletteScale = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;',
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

const Grid = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
    })
)

const Row = styled.div(
    ({}) => ({
        display: 'flex',
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
