import styled from '@emotion/styled'
import { PaletteInfo, ShadeInfo } from '../../core'
import { Checkbox } from '../../components/inputs/Checkbox'
import { useState } from 'react'
import { formatHsl, formatOkhsl } from './format-utils'
import { keyframes } from '@emotion/react'
import { paletteToBlob } from '../../utils/paletteToImage'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components'
import { BLACK_HEX, WHITE_HEX } from '../../core/utils'

export type PaletteInfoSectionProps = {
    palette?: PaletteInfo
}

export const PaletteInfoSection = (props: PaletteInfoSectionProps) => {
    const { palette } = props
    return (
        <PaletteInfoSectionRoot>
            <PaletteScale>
                { palette.shades.map((shade) => {
                    const color = Math.abs(shade.apca.blackOn) > Math.abs(shade.apca.whiteOn) ? 'black' :'white'
                    const row = createRow(shade)
                    const highlight = palette.closestShade.number === shade.number
                    return (
                        <ScaleRow>
                            <TextCell>
                                <Text>{ shade.number }</Text>
                            </TextCell>

                            <ShadeColorCell>
                                <ShadeColorDisplay css={getColorStyles(color, row.hex)}>
                                    <Text>{ row.hex }</Text>
                                </ShadeColorDisplay>
                            </ShadeColorCell>

                            <ContrastCell>
                                <ContrastDisplayGrid>
                                    <ContrastDisplay css={getColorStyles(row.hex, BLACK_HEX)}>
                                        <Text>{ row.wcag.blackOn.toFixed(2) }</Text>
                                    </ContrastDisplay>
                                    <ContrastDisplay css={getColorStyles(BLACK_HEX, row.hex)}>
                                        <Text>{ row.wcag.onBlack.toFixed(2) }</Text>
                                    </ContrastDisplay>
                                    <ContrastDisplay css={getColorStyles(row.hex, WHITE_HEX)}>
                                        <Text>{ row.wcag.whiteOn.toFixed(2) }</Text>
                                    </ContrastDisplay>
                                    <ContrastDisplay css={getColorStyles(WHITE_HEX, row.hex)}>
                                        <Text>{ row.wcag.onWhite.toFixed(2) }</Text>
                                    </ContrastDisplay>
                                </ContrastDisplayGrid>
                            </ContrastCell>

                            <ContrastCell>
                                <ContrastDisplayGrid>
                                    <ContrastDisplay css={getColorStyles(row.hex, BLACK_HEX)}>
                                        <Text>{ row.apca.blackOn.toFixed(2) }</Text>
                                    </ContrastDisplay>
                                    <ContrastDisplay css={getColorStyles(BLACK_HEX, row.hex)}>
                                        <Text>{ row.apca.onBlack.toFixed(2) }</Text>
                                    </ContrastDisplay>
                                    <ContrastDisplay css={getColorStyles(row.hex, WHITE_HEX)}>
                                        <Text>{ row.apca.whiteOn.toFixed(2) }</Text>
                                    </ContrastDisplay>
                                    <ContrastDisplay css={getColorStyles(WHITE_HEX, row.hex)}>
                                        <Text>{ row.apca.onWhite.toFixed(2) }</Text>
                                    </ContrastDisplay>
                                </ContrastDisplayGrid>
                            </ContrastCell>

                            <TextCell>
                                <Text>{ row.deltaE }</Text>
                            </TextCell>
                        </ScaleRow>
                    )
                }) }
            </PaletteScale>
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
        gridTemplateColumns: '1fr 2fr',
        gap: '24px',
    })
)

const PaletteScale = styled.div(
    ({}) => ({
        // display: 'flex',
        // flexDirection: 'column',
        // borderRadius: '8px',
        // boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
        // cursor: 'pointer',

        // '&[data-copied="true"]': {
        //     animation: `${copyAnimationKeyframes} 1s`
        // }
    })
)

const ScaleRow = styled.div({
    display: 'flex',
    columnGap: '24px',
})

const ScaleCell = styled.div({
    display: 'flex',
})

const TextCell = styled.div({
    width: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const Text = styled.div({
    fontSize: '0.875rem',
    fontWeight: 500,
})

const ShadeColorCell = styled.div({
    height: '64px',
    width: '256px',
})

const ShadeColorDisplay = styled.div({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    paddingInlineStart: '12px',

    [`& > ${Text}`]: {
        opacity: 0,
    },

    [`&:hover > ${Text}`]: {
        opacity: 1,
    },
})

const ContrastCell = styled.div({
    width: '160px',
})

const ContrastDisplayGrid = styled.div({
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
})

const ContrastDisplay = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
})
