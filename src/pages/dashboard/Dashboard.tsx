import styled from '@emotion/styled'
import { Button, Tab, TabList, TabPanel, Tabs, Toolbar } from '../../components'
import { PaletteCardAdd } from '../shared/PaletteCardAdd'
import { useNavigate } from 'react-router-dom'
import { $appPalettes, $appSets } from '../../stores'
import { PaletteCard } from '../shared/PaletteCard'
import { useUnit } from 'effector-react'
import { css, keyframes } from '@emotion/react'
import { formatHex } from 'culori'
import { useState } from 'react'
import { PalettesComparisonTable } from '../shared/PalettesComparisonTable'
import { ToggleButtonGroup } from '../../components/buttons/ToggleButtonGroup'
import { ToggleButton } from '../../components/buttons/ToggleButton'
import { PalettesTable } from '../shared/PalettesTable'
import { SetsTable } from '../shared/SetsTable'
import { AddPaletteButton } from '../shared/AddPaletteButton'
import { PageTitle } from '../shared/primitives'

/** @deprecated */
export const Dashboard = () => {
    const navigate = useNavigate()
    const appSets = useUnit($appSets)
    const appPalettes = useUnit($appPalettes)
    return (
        <DashboardRoot>
            <Header></Header>
            <Sidebar></Sidebar>

            <Toolbar>
                <PageTitle>Панель управления</PageTitle>
            </Toolbar>

            <DashboardMainSection>
                <PalettesViewTableContainer>
                    <PalettesTableToolbar>
                        <AddPaletteButton onClick={() => navigate('/palettes/new')}>
                            <span>Добавить палитру</span>
                        </AddPaletteButton>
                    </PalettesTableToolbar>

                    <PalettesTable palettes={appPalettes} />
                </PalettesViewTableContainer>

                <SetsViewTableContainer>
                    <SetsTableToolbar>
                        <Button onClick={() => navigate('/sets/new')}>
                            <span>Добавить набор</span>
                        </Button>
                    </SetsTableToolbar>

                    <SetsTable sets={appSets} />
                </SetsViewTableContainer>
            </DashboardMainSection>
        </DashboardRoot>
    )
}

const DashboardRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
})

const Header = styled.header({
    position: 'fixed',
    insetBlockStart: 0,
    insetInline: 0,
    height: '90px',
})

const Sidebar = styled.aside({
    position: 'fixed',
    insetBlock: 0,
    insetInlineStart: 0,
    width: '300px',
})

const DashboardMainSection = styled.main({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '24px',
    paddingInline: '48px',
    paddingBlock: '24px',
})

const PalettesViewTableContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const PalettesTableToolbar = styled.div(
    () => ({
        display: 'flex',
    })
)

const SetsViewTableContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const SetsTableToolbar = styled.div(
    () => ({
        display: 'flex',
    })
)
