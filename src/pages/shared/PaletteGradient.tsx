import styled from '@emotion/styled'
import { formatHsl, wcagContrast } from 'culori'
import { contrastAPCA, PaletteInfo, ShadeInfo } from '../../core'
import { formatOkhsl } from './format-utils'

type BasePaletteGradientProps = {
    palette?: PaletteInfo
}

export type PaletteGradientProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BasePaletteGradientProps> & BasePaletteGradientProps

export const PaletteGradient = (props: PaletteGradientProps) => {
    const { palette, ...restProps } = props
    return (
        <PaletteGradientRoot palette={palette} {...restProps}>
            <PaletteGradientShadePoint shade={palette.nearestShade} />
            <PaletteGradientShadePoint shade={palette.inputShade} />
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

const PaletteGradientShadePoint = styled.div<{ shade?: ShadeInfo }>(
    ({ shade }) => ({
        position: 'absolute',
        height: '11px',
        width: '11px',
        borderRadius: '50%',
        insetBlockStart: `calc(${shade.normalized * 100}%)`,
        insetInlineStart: '50%',
        translate: '-50% -50%',
        backgroundColor: shade.hex,
        boxShadow: '0 0 0 1px white, 0 0 0 3px black',
    })
)
