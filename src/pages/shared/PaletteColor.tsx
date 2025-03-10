import styled from '@emotion/styled'
import { formatHsl } from 'culori'
import { ShadeInfo } from '../../engine'
import { formatOkhsl } from './format-utils'

type BasePaletteColorProps = {
    shade?: ShadeInfo
    nearest?: boolean
}

export type PaletteColorProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BasePaletteColorProps> & BasePaletteColorProps

export const PaletteColor = (props: PaletteColorProps) => {
    if (!props.shade) return
    const { shade, nearest, ...restProps } = props
    let textColor = Math.abs(shade.apca.blackOn) >= 45 ? 'black' : 'white'
    return (
        <PaletteColorRoot {...restProps}>
            <PaletteColorRect
                data-highlight={nearest}
                style={{ backgroundColor: shade.hex }}
            >
                <span style={{ color: textColor }}>{ shade.number }</span>
            </PaletteColorRect>

            <PaletteColorDescriptionContainer>
                {/* <Title>
                    { shade.number }
                </Title> */}
                <Subtitle>
                    { shade.hex }
                </Subtitle>
                <Caption>
                    WCAG { shade.wcag.blackOn.toFixed(2) }/{ shade.wcag.whiteOn.toFixed(2) }
                </Caption>
                <Caption>
                    APCA { shade.apca.blackOn.toFixed(1) }/{ shade.apca.whiteOn.toFixed(1) }
                </Caption>
                {/* <Caption>
                    HSL { formatHsl(shade.hsl) }
                </Caption>
                <Caption>
                    OKHSL { formatOkhsl(shade.okhsl) }
                </Caption> */}
                <Caption>
                    deltaE { shade.delta.toPrecision(4) }
                </Caption>
            </PaletteColorDescriptionContainer>
        </PaletteColorRoot>
    )
}

const PaletteColorRoot = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.5rem',
})

const PaletteColorRect = styled.div({
    aspectRatio: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    borderRadius: '0.5rem',
    fontWeight: '500',

    '&[data-highlight="true"]': {
        boxShadow: '0 0 0 1px white, 0 0 0 3px black',
    }
})

const PaletteColorDescriptionContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.125rem',
    paddingInlineEnd: '0.5rem',
    overflowWrap: 'anywhere',
})

const Title = styled.div(
    () => ({
        fontSize: '0.875rem',
        fontWeight: '600',
    })
)

const Subtitle = styled.div(
    () => ({
        fontSize: '0.75rem',
        fontWeight: '500',
    })
)

const Caption = styled.div(
    () => ({
        fontSize: '0.6875rem',
    })
)
