import styled from '@emotion/styled'
import { wcagContrast } from 'culori'
import { contrastAPCA, ShadeInfo } from '../../core'

type BasePaletteColorProps = {
    shade?: ShadeInfo
    closest?: boolean
}

export type PaletteColorProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BasePaletteColorProps> & BasePaletteColorProps

export const PaletteColor = (props: PaletteColorProps) => {
    if (!props.shade) return
    const { shade, closest, ...restProps } = props
    let wcagBlack = wcagContrast(shade.hexcode, 'black')
    let wcagWhite = wcagContrast(shade.hexcode, 'white')
    let apcaBlack = contrastAPCA('black', shade.hexcode)
    let apcaWhite = contrastAPCA('white', shade.hexcode)
    let textColor = Math.abs(apcaBlack) > 60 ? 'black' : Math.abs(apcaWhite) > 60 ? 'white' : '#808080'
    return (
        <PaletteColorRoot {...restProps}>
            <PaletteColorRect
                data-highlight={closest}
                {...props}
                style={{ backgroundColor: shade.hexcode }}
            >
                <span style={{ color: textColor }}>{ shade.number }</span>
            </PaletteColorRect>

            <PaletteColorDescriptionContainer>
                <Title>
                    { shade.number }
                </Title>
                <Subtitle>
                    { shade.hexcode }
                </Subtitle>
                <Caption>
                    WCAG { wcagBlack.toFixed(2) }/{ wcagWhite.toFixed(2) }
                </Caption>
                <Caption>
                    APCA { apcaBlack.toFixed(1) }/{ apcaWhite.toFixed(1) }
                </Caption>
                <Caption>
                    HSL { shade.hsl.hue } { shade.hsl.saturation } { shade.hsl.lightness }
                </Caption>
                <Caption>
                    OKHSL { shade.okhsl.hue } { shade.okhsl.saturation } { shade.okhsl.lightness }
                </Caption>
                <Caption>
                    deltaE { shade.delta.toPrecision(4) }
                </Caption>
            </PaletteColorDescriptionContainer>
        </PaletteColorRoot>
    )
}

const PaletteColorRoot = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '8px',
    })
)

const PaletteColorRect = styled.div(
    ({}) => ({
        position: 'relative',
        aspectRatio: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        fontWeight: '500',
        borderRadius: '8px',

        '&[data-highlight="true"]': {
            boxShadow: '0 0 0 1px white, 0 0 0 3px black',
        }
    })
)

const PaletteColorDescriptionContainer = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '2px',
    })
)

const Title = styled.div(
    () => ({
        fontSize: '14px',
        fontWeight: '600',
    })
)

const Subtitle = styled.div(
    () => ({
        fontSize: '14px',
    })
)

const Caption = styled.div(
    () => ({
        fontSize: '11px',
    })
)
