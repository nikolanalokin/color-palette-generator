import styled from '@emotion/styled'
import { PaletteInfo } from '../../engine'
import { PaletteColor } from './PaletteColor'

export type PaletteDisplayLineProps = React.HTMLAttributes<HTMLDivElement> & {
    palette?: PaletteInfo
}

export const PaletteDisplayLine = (props: PaletteDisplayLineProps) => {
    const { palette, ...restProps } = props
    return (
        <PaletteDisplayLineRoot {...restProps}>
            {/* <Gradient
                style={{
                    background: `linear-gradient(to right, ${
                        palette.shades.map((shade, i, arr) => `${shade.hex} ${shade.number / arr.at(-1).number * 100}%`).join(', ')
                    })`
                }}
            /> */}

            <PaletteContainer>
                { palette.shades.map((shade) => (
                    <StyledPaletteColor
                        key={shade.guid}
                        shade={shade}
                        nearest={shade.number === palette.nearestShade.number}
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
        flex: '1 0 0%',
    })
)
