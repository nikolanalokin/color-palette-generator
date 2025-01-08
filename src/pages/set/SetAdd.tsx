import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import styled from '@emotion/styled'
import { $appPalettes, $editedAppSet, addAppSet, createDefaultAppSet, setEditedAppSet } from '../../stores'
import { Button, ContentLoader, IconButton, TextInput, Toolbar } from '../../components'
import { PalettesSelectionTable } from '../shared/PalettesSelectionTable'
import { PageTitle, Spacer, VerticalDivider } from '../shared/primitives'
import { ArrowLeftIcon } from 'lucide-react'
import { usePageNav } from '../shared/usePageNav'

export const SetAdd = () => {
    const navigate = useNavigate()
    const editedAppSet = useUnit($editedAppSet)
    const palettes = useUnit($appPalettes)

    usePageNav('Создание набора', { to: '/dashboard/sets' })

    useEffect(() => {
        setEditedAppSet(createDefaultAppSet())
        return () => {
            setEditedAppSet(null)
        }
    }, [])

    if (!editedAppSet) {
        return <ContentLoader />
    }

    const updateName = (name: string) => {
        setEditedAppSet({ ...editedAppSet, name })
    }

    const updatePalettes = (paletteIds: string[]) => {
        setEditedAppSet({ ...editedAppSet, palettes: paletteIds })
    }

    const valid = !!editedAppSet.name && editedAppSet.palettes.length > 0

    return (
        <SetRoot>
            <Toolbar>
                <Button
                    disabled={!valid}
                    onClick={() => {
                        addAppSet(editedAppSet)
                        navigate('/dashboard')
                    }}
                >
                    Сохранить
                </Button>
            </Toolbar>

            <SetMainSection>
                <TextInput
                    labelText="Название набора"
                    value={editedAppSet.name}
                    onChange={updateName}
                />

                <PalettesSelectionTable
                    palettes={palettes}
                    value={editedAppSet.palettes}
                    onValueChange={updatePalettes}
                />
            </SetMainSection>
        </SetRoot>
    )
}

const SetRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '24px',
})

const SetMainSection = styled.main({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})
