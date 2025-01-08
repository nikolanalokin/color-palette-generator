import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { formatHex } from 'culori'
import { Button } from '../../components'

const rotate = keyframes`
    to {
        --angle: 360deg;
    }
`

const angleProperty = css`
    @property --angle {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }
`

const gradientStops =
    new Array(360 / 30 + 1)
    .fill(0)
    .reduce((acc, _, i) => [...acc, i * 30], [])
    .map(hue => formatHex({ mode: 'okhsl', h: hue, s: 1, l: .6 }))
    .join(',')

export const AddPaletteButton = styled(Button)(
    angleProperty,
    {
        '--angle': '0deg',
        '--gradient': `
            conic-gradient(
                from var(--angle),
                ${gradientStops}
            )
        `,
    },
    {
        position: 'relative',
        borderRadius: '6px',
        backgroundImage: 'var(--gradient)',
        color: 'black',
        animation: `${rotate} 10s linear infinite`,
        transition: 'color .2s',

        '& span': {
            position: 'relative',
        },

        '&::before': {
            content: '""',
            position: 'absolute',
            inset: '2px',
            borderRadius: '4px',
            backgroundColor: 'white',
            transition: 'opacity .2s',
        },

        '&:hover': {
            color: 'white',

            '&::before': {
                opacity: 0,
            }
        },

        // backgroundClip: 'text',
        // color: 'transparent',
    }
)
