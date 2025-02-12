import { useState } from 'react'
import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { $palettes } from '../../stores'
import { usePageNav } from '../shared/usePageNav'
import { AddPaletteButton } from '../shared/AddPaletteButton'
import { PalettesTable } from '../shared/PalettesTable'
import { Section, Spacer } from '../shared/primitives'
import { ToggleButton, ToggleButtonGroup } from '../../components'
import { PaletteListView } from './shared/PaletteListView'

export const PaletteIndex = () => {
    const navigate = useNavigate()

    usePageNav('Палитры', { to: '/dashboard' })

    const palettes = useUnit($palettes)

    const [viewMode, setViewMode] = useState('list')

    return (
        <PaletteIndexRoot>
            <PaletteIndexMainSection>
                <Section>
                    <PalettesViewContainer>
                        <PalettesViewToolbarContainer>
                            <ToggleButtonGroup value={viewMode} onValueChange={setViewMode}>
                                <ToggleButton value="list">Список</ToggleButton>
                                <ToggleButton value="comparison">Сравнение</ToggleButton>
                            </ToggleButtonGroup>

                            <Spacer />

                            <AddPaletteButton onClick={() => navigate('new')}>
                                <span>Добавить палитру</span>
                            </AddPaletteButton>
                        </PalettesViewToolbarContainer>

                        { viewMode === 'list' ? (
                            <PalettesViewListContainer>
                                <PaletteListView
                                    palettes={palettes}
                                />
                            </PalettesViewListContainer>
                        ) : viewMode === 'comparison' ? (
                            <PalettesViewComparisonContainer>
                                <PalettesTable
                                    palettes={palettes}
                                />
                            </PalettesViewComparisonContainer>
                        ) : null }
                    </PalettesViewContainer>
                </Section>
            </PaletteIndexMainSection>
        </PaletteIndexRoot>
    )
}

const PaletteIndexRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
})

const PaletteIndexMainSection = styled.main({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const PalettesViewContainer = styled.section({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const PalettesViewToolbarContainer = styled.section({
    display: 'flex',
})

const PalettesViewListContainer = styled.div({
    display: 'flex',
})

const PalettesViewComparisonContainer = styled.div({
    display: 'flex',
})
