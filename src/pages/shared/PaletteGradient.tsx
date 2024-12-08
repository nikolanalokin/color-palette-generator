import styled from '@emotion/styled'
import { formatHex, formatHsl, wcagContrast } from 'culori'
import { contrastAPCA, PaletteInfo, ShadeInfo } from '../../core'
import { formatOkhsl } from './format-utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components'

type BasePaletteGradientProps = {
    palette?: PaletteInfo
}

export type PaletteGradientProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BasePaletteGradientProps> & BasePaletteGradientProps

export const PaletteGradient = (props: PaletteGradientProps) => {
    const { palette, ...restProps } = props
    return (
        <PaletteGradientRoot palette={palette} {...restProps}>
            { palette.shades.map(shade => (
                <PaletteGradientShadePoint
                    key={shade.number}
                    shade={shade}
                    data-nearest={shade.number === palette.nearestShade.number}
                />
            )) }

            <PaletteGradientShadePoint
                shade={palette.inputShade}
                data-input={true}
            />
        </PaletteGradientRoot>
    )
}

const PaletteGradientRoot = styled.div<{ palette?: PaletteInfo }>(
    ({ palette }) => {
        const stops = palette.shades.map(shade => `${shade.hex} ${shade.normalized * 100}%`).join(', ')
        return {
            position: 'relative',
            width: '32px',
            height: '100%',
            background: `linear-gradient(to bottom, ${stops})`,
            boxShadow: '0 0 0 1px black',
        }
    }
)

type PaletteGradientShadePointProps = {
    shade: ShadeInfo
}

const PaletteGradientShadePoint = ({ shade, ...restProps }: PaletteGradientShadePointProps) => {
    return (
        <Tooltip placement="right">
            <TooltipTrigger asChild>
                <PaletteGradientShadePointRoot shade={shade} {...restProps} />
            </TooltipTrigger>
            <TooltipContent>
                { shade.number }
            </TooltipContent>
        </Tooltip>
    )
}

const PaletteGradientShadePointRoot = styled.div<{ shade?: ShadeInfo }>(
    ({ shade }) => ({
        position: 'absolute',
        height: '8px',
        width: '8px',
        borderRadius: '50%',
        insetBlockStart: `calc(${shade.normalized * 100}%)`,
        insetInlineStart: '50%',
        translate: '-50% -50%',
        backgroundColor: shade.hex,
        boxShadow: '0 0 0 1px white, 0 0 0 3px black',

        '&[data-nearest="true"]': {
            boxShadow: `0 0 0 1px white, 0 0 0 3px black`,
        },

        '&[data-input="true"]': {
            height: '12px',
            width: '12px',
            boxShadow: `0 0 0 1px white, 0 0 0 3px black`,
        },
    })
)
