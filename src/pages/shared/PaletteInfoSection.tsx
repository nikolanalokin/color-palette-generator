import styled from '@emotion/styled'
import { invlerp, PaletteInfo, ShadeInfo } from '../../core'
import { Checkbox } from '../../components/inputs/Checkbox'
import { useState } from 'react'
import { formatHsl, formatOkhsl } from './format-utils'
import { keyframes } from '@emotion/react'
import { paletteToBlob } from '../../utils/paletteToImage'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components'
import { BLACK_HEX, WHITE_HEX } from '../../core/utils'
import { PaletteGradient } from './PaletteGradient'
import { InfoIcon } from 'lucide-react'
import { setThemeShade } from '../../stores/app'

export type PaletteInfoSectionProps = {
    palette?: PaletteInfo
}

export const PaletteInfoSection = (props: PaletteInfoSectionProps) => {
    const { palette } = props
    const tip = (
        <Tooltip>
            <TooltipTrigger asChild>
                <InfoIcon size="1em" />
            </TooltipTrigger>
            <TooltipContent>
                <span>Контрастность:</span>
                <ol>
                    <li>чёрного на цвете</li>
                    <li>белого на цвете</li>
                    <li>цвета на черном</li>
                    <li>цвета на белом</li>
                </ol>
            </TooltipContent>
        </Tooltip>
    )
    return (
        <PaletteInfoSectionRoot>
            <PaletteGradientContainer>
                <PaletteGradient palette={palette} />
            </PaletteGradientContainer>
            <Table>
                <thead>
                    <TableHeadRow>
                        <TextCell></TextCell>

                        <ShadeColorCell></ShadeColorCell>

                        <ContrastCell>
                            <Heading>
                                <span>WCAG</span>
                                { tip }
                            </Heading>
                        </ContrastCell>

                        <ContrastCell>
                            <Heading>
                                <span>APCA</span>
                                { tip }
                            </Heading>
                        </ContrastCell>

                        <TextCell>
                            <Heading>ΔE</Heading>
                        </TextCell>
                    </TableHeadRow>
                </thead>
                <tbody>
                    { palette.shades.map((shade) => {
                        const color = Math.abs(shade.apca.blackOn) >= 45 ? 'black' :'white'
                        const row = createRow(shade)
                        const highlight = palette.nearestShade.number === shade.number
                        return (
                            <TableRow key={shade.number} data-highlight={highlight}>
                                <TextCell>
                                    <Text>{ shade.number }</Text>
                                </TextCell>

                                <ShadeColorCell>
                                    <ShadeColorDisplay css={getColorStyles(color, row.hex)} onClick={() => setThemeShade(shade)}>
                                        <Text>{ row.hex }</Text>
                                    </ShadeColorDisplay>
                                </ShadeColorCell>

                                <ContrastCell>
                                    <ContrastDisplayGrid>
                                        <ContrastDisplay css={getColorStyles(BLACK_HEX, row.hex)}>
                                            <Text>{ row.wcag.blackOn.toFixed(2) }</Text>
                                        </ContrastDisplay>
                                        <ContrastDisplay css={getColorStyles(row.hex, BLACK_HEX)}>
                                            <Text>{ row.wcag.onBlack.toFixed(2) }</Text>
                                        </ContrastDisplay>
                                        <ContrastDisplay css={getColorStyles(WHITE_HEX, row.hex)}>
                                            <Text>{ row.wcag.whiteOn.toFixed(2) }</Text>
                                        </ContrastDisplay>
                                        <ContrastDisplay css={getColorStyles(row.hex, WHITE_HEX)}>
                                            <Text>{ row.wcag.onWhite.toFixed(2) }</Text>
                                        </ContrastDisplay>
                                    </ContrastDisplayGrid>
                                </ContrastCell>

                                <ContrastCell>
                                    <ContrastDisplayGrid>
                                        <ContrastDisplay css={getColorStyles(BLACK_HEX, row.hex)}>
                                            <Text>{ row.apca.blackOn.toFixed(2) }</Text>
                                        </ContrastDisplay>
                                        <ContrastDisplay css={getColorStyles(row.hex, BLACK_HEX)}>
                                            <Text>{ row.apca.onBlack.toFixed(2) }</Text>
                                        </ContrastDisplay>
                                        <ContrastDisplay css={getColorStyles(WHITE_HEX, row.hex)}>
                                            <Text>{ row.apca.whiteOn.toFixed(2) }</Text>
                                        </ContrastDisplay>
                                        <ContrastDisplay css={getColorStyles(row.hex, WHITE_HEX)}>
                                            <Text>{ row.apca.onWhite.toFixed(2) }</Text>
                                        </ContrastDisplay>
                                    </ContrastDisplayGrid>
                                </ContrastCell>

                                <TextCell>
                                    <Text>{ row.deltaE }</Text>
                                </TextCell>
                            </TableRow>
                        )
                    }) }
                </tbody>
            </Table>
        </PaletteInfoSectionRoot>
    )
}

const createRow = (shade: ShadeInfo) => {
    return {
        hex: shade.hex,
        wcag: shade.wcag,
        apca: shade.apca,
        hsl: formatHsl(shade.hsl),
        okhsl: formatOkhsl(shade.okhsl),
        deltaE: shade.delta.toPrecision(4),
    }
}

const getColorStyles = (fgColor: string, bgColor: string) => {
    return {
        color: fgColor,
        backgroundColor: bgColor,
    }
}

const PaletteInfoSectionRoot = styled.div(
    ({}) => ({
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '24px',
    })
)

const PaletteGradientContainer = styled.div({
    paddingBlockStart: '64px',
})

const Table = styled.table({
    position: 'relative',
    borderCollapse: 'collapse',
    borderSpacing: '24px 0',
})

const TableHeadRow = styled.tr({
    height: '64px',
})

const TableRow = styled.tr({
    '&[data-highlight="true"]': {
        position: 'relative',
        boxShadow: '0 0 0 1px white, 0 0 0 3px black',
    }
})

const Cell = styled.td({
    padding: 0,
    paddingInline: '8px',

    '&:first-of-type': {
        paddingInlineStart: '16px',
    },
    '&:last-of-type': {
        paddingInlineEnd: '16px',
    },
})

const TextCell = styled(Cell)({

})

const Heading = styled.div({
    fontSize: '1rem',
    fontWeight: 600,
    display: 'flex',
    columnGap: '8px',
    alignItems: 'center',
})

const Text = styled.div({
    fontSize: '0.875rem',
    fontWeight: 500,
})

const ShadeColorCell = styled(Cell)({
})

const ShadeColorDisplay = styled.div({
    height: '64px',
    width: '256px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    paddingInlineStart: '12px',
    cursor: 'pointer',

    [`& > ${Text}`]: {
        opacity: 0,
    },

    [`&:hover > ${Text}`]: {
        opacity: 1,
    },
})

const ContrastCell = styled(Cell)({
})

const ContrastDisplayGrid = styled.div({
    width: '160px',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    borderRadius: '8px',
    overflow: 'hidden',
})

const ContrastDisplay = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
})
