import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { ContentLoader } from '../../components'
import { $sets, $editedSet, $palettes, createDefaultSet, setEditedSet } from '../../stores'
import { AddPaletteButton } from '../shared/AddPaletteButton'
import { Section, Spacer } from '../shared/primitives'
import { usePageNav } from '../shared/usePageNav'
import { ResultsTable } from '../shared/ResultsTable'

export const Set = () => {
    const { setId } = useParams()
    const navigate = useNavigate()

    usePageNav('Редактирование набора', { to: '/dashboard/sets' })

    const sets = useUnit($sets)
    const palettes = useUnit($palettes)
    const editedSet = useUnit($editedSet)

    const [viewMode, setViewMode] = useState('table')

    useEffect(() => {
        if (setId) {
            const set = sets.find(set => set.id === setId)
            if (set) setEditedSet(set)
            else setEditedSet(createDefaultSet())
        } else {
            setEditedSet(createDefaultSet())
        }
    }, [setId])

    if (!editedSet) {
        return <ContentLoader />
    }

    const filteredPalettes = palettes.filter(p => editedSet.paletteIds.includes(p.id))

    return (
        <SetRoot>
            <SetMainSection>
                <Section>
                    <PalettesViewContainer>
                        <PalettesViewToolbarContainer>
                            { editedSet.name }

                            <Spacer />

                            <AddPaletteButton onClick={() => navigate('/dashboard/palettes/new')}>
                                <span>Добавить палитру</span>
                            </AddPaletteButton>
                        </PalettesViewToolbarContainer>

                        { editedSet.templateId ? (
                            <ResultsTable
                                palettes={filteredPalettes}
                            />
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
