import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import styled from '@emotion/styled'
import { $palettes, $editedSet, addSet, createDefaultSet, setEditedSet, $sets } from '../../stores'
import { Button, ColorsInput, ContentLoader, Field, FieldLabel, Option2, Select2, TextInput, ToggleButton, ToggleButtonGroup } from '../../components'
import { PalettesSelectionTable } from './shared/PalettesSelectionTable'
import { Section, Spacer } from '../shared/primitives'
import { usePageNav } from '../shared/usePageNav'
import { $templates } from '../../stores/template'
import { SetVO } from '../../types'
import { getGeneratorInstance } from '../../core/astral'
import { getNextId } from '../../utils/getNextId'
import { createPalettes } from '../../controllers'

export const SetAdd = () => {
    const navigate = useNavigate()
    const sets = useUnit($sets)
    const editedSet = useUnit($editedSet)
    const palettes = useUnit($palettes)
    const templates = useUnit($templates)

    usePageNav('Создание набора', { to: '/dashboard/sets' })

    const [type, setType] = useState('templated')

    useEffect(() => {
        setEditedSet(createDefaultSet())
        return () => {
            setEditedSet(null)
        }
    }, [])

    if (!editedSet) {
        return <ContentLoader />
    }

    const {
        name,
        templateId,
        colors,
        paletteIds,
    } = editedSet

    const update = (changes: Partial<SetVO>) => {
        setEditedSet({ ...editedSet, ...changes })
    }

    const handleSave = () => {
        if (templateId) {
            const template = templates.find(t => t.id === templateId)
            const generator = getGeneratorInstance(template)
            const results = colors.map(color => ({ ...generator.generate(color), templateId: templateId }))
            const ps = createPalettes(results)
            addSet({ ...editedSet, id: getNextId(sets), paletteIds: ps.map(r => r.id)})
        } else {
            addSet({ ...editedSet, id: getNextId(sets), })
        }
        navigate('/dashboard/sets', { replace: true })
        setEditedSet(null)
    }

    const valid = !!editedSet.name && templateId ? (colors.length && templateId) : paletteIds.length > 0

    return (
        <SetAddRoot>
            <SetAddMainSection>
                <Section>
                    <SetAddFormContainer>
                        <SetAddFormToolbar>
                            <ToggleButtonGroup value={type} onValueChange={setType}>
                                <ToggleButton value="collection">Коллекция</ToggleButton>
                                <ToggleButton value="templated">На основе шаблона</ToggleButton>
                            </ToggleButtonGroup>

                            <Spacer />

                            <Button
                                disabled={!valid}
                                onClick={handleSave}
                            >
                                Сохранить
                            </Button>
                        </SetAddFormToolbar>

                        <SetAddForm>
                            <TextInput
                                labelText="Название набора"
                                value={name}
                                onChange={name => update({ name })}
                            />

                            { type === 'collection' ? (
                                <PalettesSelectionTable
                                    palettes={palettes}
                                    value={paletteIds}
                                    onValueChange={paletteIds => update({ paletteIds })}
                                />
                            ) : type === 'templated' ? (
                                <>
                                    <Field>
                                        <FieldLabel>Шаблон</FieldLabel>
                                        <Select2
                                            value={templateId}
                                            onValueChange={templateId => update({ templateId })}
                                        >
                                            { templates.map(t => (
                                                <Option2 key={t.id} value={t.id}>
                                                    { t.name }
                                                </Option2>
                                            ))}
                                        </Select2>
                                    </Field>

                                    <ColorsInput
                                        labelText="Цвета"
                                        value={colors}
                                        onValueChange={(colors: string[]) => update({ colors })}
                                    />
                                </>
                            ) : null }
                        </SetAddForm>
                    </SetAddFormContainer>
                </Section>
            </SetAddMainSection>
        </SetAddRoot>
    )
}

const SetAddRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
})

const SetAddMainSection = styled.main({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const SetAddFormContainer = styled.section({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const SetAddFormToolbar = styled.section({
    display: 'flex',
})

const SetAddForm = styled.section({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})
