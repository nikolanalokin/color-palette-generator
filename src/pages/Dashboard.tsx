import styled from '@emotion/styled'
import { Button, Toolbar } from '../components'
import { PaletteCardAdd } from './shared/PaletteCardAdd'
import { useNavigate } from 'react-router-dom'
import { $appPalettes } from '../stores/app'
import { PaletteCard } from './shared/PaletteCard'
import { useUnit } from 'effector-react'
import { css, keyframes } from '@emotion/react'
import { formatHex, okhsl } from 'culori'

export const Dashboard = () => {
    const appPalettes = useUnit($appPalettes)
    const navigate = useNavigate()
    return (
        <DashboardRoot>
            <Toolbar>
                <AddButton onClick={() => navigate('/palette/new')}>
                    <span>Добавить палитру</span>
                </AddButton>
            </Toolbar>

            <PalettesContainer>
                { appPalettes.map(palette => (
                    <PaletteCard
                        key={palette.id}
                        data={palette}
                    />
                )) }
                {/* <PaletteCardAdd to="/palette/new" /> */}
            </PalettesContainer>
        </DashboardRoot>
    )
}

const DashboardRoot = styled.main({
    flexGrow: 1,
})

const PalettesContainer = styled.section({
    paddingInline: '48px',
    paddingBlock: '24px',
    display: 'flex',
    columnGap: '24px',
})

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

const AddButton = styled(Button)(
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
