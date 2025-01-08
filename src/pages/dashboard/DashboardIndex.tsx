import styled from '@emotion/styled'
import { Button, Toolbar } from '../../components'
import { useNavigate } from 'react-router-dom'
import { $appPalettes, $appSets } from '../../stores'
import { useUnit } from 'effector-react'
import { PalettesTable } from '../shared/PalettesTable'
import { SetsTable } from '../shared/SetsTable'
import { AddPaletteButton } from '../shared/AddPaletteButton'
import { usePageNav } from '../shared/usePageNav'

export const DashboardIndex = () => {
    const navigate = useNavigate()
    const appSets = useUnit($appSets)
    const appPalettes = useUnit($appPalettes)
    usePageNav('Панель управления', null)
    return (
        <DashboardIndexRoot>
            <DashboardIndexMainSection>
                <PalettesViewTableContainer>
                    <PalettesTableToolbar>
                        <AddPaletteButton onClick={() => navigate('palettes/new')}>
                            <span>Добавить палитру</span>
                        </AddPaletteButton>
                    </PalettesTableToolbar>

                    <PalettesTable palettes={appPalettes} />
                </PalettesViewTableContainer>

                <SetsViewTableContainer>
                    <SetsTableToolbar>
                        <Button onClick={() => navigate('sets/new')}>
                            <span>Добавить набор</span>
                        </Button>
                    </SetsTableToolbar>

                    <SetsTable sets={appSets} />
                </SetsViewTableContainer>
            </DashboardIndexMainSection>
        </DashboardIndexRoot>
    )
}

const DashboardIndexRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
})

const DashboardIndexMainSection = styled.main({
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
