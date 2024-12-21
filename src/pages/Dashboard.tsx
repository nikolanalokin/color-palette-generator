import styled from '@emotion/styled'
import { Button, Tab, TabList, TabPanel, Tabs, Toolbar } from '../components'
import { PaletteCardAdd } from './shared/PaletteCardAdd'
import { useNavigate } from 'react-router-dom'
import { $appPalettes } from '../stores/app'
import { PaletteCard } from './shared/PaletteCard'
import { useUnit } from 'effector-react'
import { css, keyframes } from '@emotion/react'
import { formatHex } from 'culori'
import { useState } from 'react'
import { PalettesComparisonTable } from './shared/PalettesComparisonTable'
import { ToggleButtonGroup } from '../components/buttons/ToggleButtonGroup'
import { ToggleButton } from '../components/buttons/ToggleButton'
import { PalettesTable } from './shared/PalettesTable'

export const Dashboard = () => {
    const navigate = useNavigate()
    const [isComparisonMode, setIsComparisonMode] = useState(false)
    const [viewMode, setViewMode] = useState('table')
    const appPalettes = useUnit($appPalettes)
    return (
        <DashboardRoot>
            {/* <Toolbar></Toolbar> */}

            <DashboardMainSection>
                <Tabs defaultValue="view">
                    <TabList>
                        <Tab value="view">Обзор</Tab>
                        <Tab value="comparison">Сравнение</Tab>

                        <div css={{ flexGrow: 1 }}></div>

                        <AddButton onClick={() => navigate('/palette/new')}>
                            <span>Добавить палитру</span>
                        </AddButton>
                    </TabList>

                    <TabPanel value="view">
                        <PalettesViewContainer>
                            <PalettesViewToolbarContainer>
                                <ToggleButtonGroup value={viewMode} onValueChange={setViewMode}>
                                    <ToggleButton value="grid">Сетка</ToggleButton>
                                    <ToggleButton value="table">Таблица</ToggleButton>
                                </ToggleButtonGroup>
                            </PalettesViewToolbarContainer>

                            { viewMode === 'grid' ? (
                                <PalettesViewGridContainer>
                                    { appPalettes.map(palette => (
                                        <PaletteCard
                                            key={palette.id}
                                            data={palette}
                                        />
                                    )) }
                                </PalettesViewGridContainer>
                            ) : viewMode === 'table' ? (
                                <PalettesViewTableContainer>
                                    <PalettesTable palettes={appPalettes} />
                                </PalettesViewTableContainer>
                            ) : null }
                        </PalettesViewContainer>
                    </TabPanel>

                    <TabPanel value="comparison">
                        <PalettesComparisonTableContainer>
                            <PalettesComparisonTable palettes={appPalettes} />
                        </PalettesComparisonTableContainer>
                    </TabPanel>
                </Tabs>
            </DashboardMainSection>
        </DashboardRoot>
    )
}

const DashboardRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
})

const DashboardMainSection = styled.main({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
    paddingInline: '48px',
    paddingBlock: '24px',
})

const PalettesViewToolbarContainer = styled.section({
    display: 'flex',
    colGap: '8px',
})

const PalettesViewContainer = styled.section({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const PalettesViewGridContainer = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '24px',
})

const PalettesViewTableContainer = styled.div({
    display: 'grid',
})

const PalettesComparisonTableContainer = styled.section({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
