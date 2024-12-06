import styled from '@emotion/styled'
import { PaletteInfo } from '../../core'
import { PaletteColor } from './PaletteColor'

export type PaletteDisplayLineProps = {
    palette?: PaletteInfo
}

export const PaletteDisplayLine = (props: PaletteDisplayLineProps) => {
    const { palette } = props
    return (
        <PaletteDisplayLineRoot>
            <Gradient
                style={{
                    background: `linear-gradient(to right, ${palette.shades.map((shade, i, arr) => `${shade.hex} ${shade.number / arr.at(-1).number * 100}%`).join(', ')})`
                }}
            />

            <PaletteContainer>
                { palette.shades.map((shade) => (
                    <StyledPaletteColor
                        key={shade.number}
                        shade={shade}
                        closest={shade.hex === palette.closestShade.hex}
                    />
                )) }
            </PaletteContainer>
        </PaletteDisplayLineRoot>
    )
}

const PaletteDisplayLineRoot = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '12px',
    })
)

const Gradient = styled.div(
    ({}) => ({
        height: '48px',
        borderRadius: '8px',
    })
)

const PaletteContainer = styled.div(
    ({}) => ({
        display: 'flex',
        flexWrap: 'nowrap',
        columnGap: '8px',
    })
)

const StyledPaletteColor = styled(PaletteColor)(
    ({}) => ({
        flexGrow: 1,
        flexBasis: 0,
    })
)
