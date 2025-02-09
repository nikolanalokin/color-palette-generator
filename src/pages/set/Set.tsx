import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { Button, ContentLoader, IconButton, Toolbar } from '../../components'
import { $appPalettes, $appSets, $editedAppSet, createDefaultAppSet, setEditedAppSet } from '../../stores'
import { PaletteCard } from '../shared/PaletteCard'
import { ToggleButtonGroup } from '../../components/buttons/ToggleButtonGroup'
import { ToggleButton } from '../../components/buttons/ToggleButton'
import { PalettesTable } from '../shared/PalettesTable'
import { AddPaletteButton } from '../shared/AddPaletteButton'
import { ArrowLeftIcon } from 'lucide-react'
import { PageTitle, Section, Spacer, VerticalDivider } from '../shared/primitives'
import { usePageNav } from '../shared/usePageNav'

export const Set = () => {
    const { setId } = useParams()
    const navigate = useNavigate()

    usePageNav('Редактирование набора', { to: '/dashboard/sets' })

    const sets = useUnit($appSets)
    const editedAppSet = useUnit($editedAppSet)
    const appPalettes = useUnit($appPalettes)

    const [viewMode, setViewMode] = useState('table')

    useEffect(() => {
        if (setId) {
            const set = sets.find(set => set.id === setId)
            if (set) setEditedAppSet(set)
            else setEditedAppSet(createDefaultAppSet())
        } else {
            setEditedAppSet(createDefaultAppSet())
        }
    }, [setId])

    if (!editedAppSet) {
        return <ContentLoader />
    }

    const palettes = appPalettes.filter(p => editedAppSet.palettes.includes(p.id))

    return (
        <SetRoot>
            <SetMainSection>
                <Section>
                    <PalettesViewContainer>
                        <PalettesViewToolbarContainer>
                            <ToggleButtonGroup value={viewMode} onValueChange={setViewMode}>
                                <ToggleButton value="grid">Сетка</ToggleButton>
                                <ToggleButton value="table">Таблица</ToggleButton>
                            </ToggleButtonGroup>

                            <Spacer />

                            <AddPaletteButton onClick={() => navigate('/dashboard/palettes/new')}>
                                <span>Добавить палитру</span>
                            </AddPaletteButton>
                        </PalettesViewToolbarContainer>

                        { viewMode === 'grid' ? (
                            <PalettesViewGridContainer>
                                { palettes.map(palette => (
                                    <PaletteCard
                                        key={palette.id}
                                        data={palette}
                                    />
                                )) }
                            </PalettesViewGridContainer>
                        ) : viewMode === 'table' ? (
                            <PalettesViewTableContainer>
                                <PalettesTable palettes={palettes} />
                            </PalettesViewTableContainer>
                        ) : null }
                    </PalettesViewContainer>
                </Section>
            </SetMainSection>
        </SetRoot>
    )
}

const SetRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
})

const SetMainSection = styled.main({
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

const PalettesViewGridContainer = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '24px',
})

const PalettesViewTableContainer = styled.div({
    display: 'grid',
})
