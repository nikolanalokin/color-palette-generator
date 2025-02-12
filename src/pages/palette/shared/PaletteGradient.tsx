import styled from '@emotion/styled'
import { ShadeInfo } from '../../../astral'
import { InfoTooltip } from '../../../components'
import { PaletteVO } from '../../../types'

type BasePaletteGradientProps = {
    palette?: PaletteVO
}

export type PaletteGradientProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BasePaletteGradientProps> & BasePaletteGradientProps

export const PaletteGradient = (props: PaletteGradientProps) => {
    const { palette, ...restProps } = props
    if (!palette?.shades) {
        return null
    }
    return (
        <PaletteGradientRoot palette={palette} {...restProps}>
            { palette?.shades.map(shade => (
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

const PaletteGradientRoot = styled.div<{ palette?: PaletteVO }>(
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
        <InfoTooltip message={shade.number}>
            <PaletteGradientShadePointRoot shade={shade} {...restProps} />
        </InfoTooltip>
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
