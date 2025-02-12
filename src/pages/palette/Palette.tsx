import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { ContentLoader, Tabs, TabList, Tab, TabPanel } from '../../components'
import { $palettes, $editedPalette, setEditedPalette, createDefaultPalette, updatePalette, addPalette, createDefaultCommonPaletteSettings } from '../../stores'
import { PalettePlots } from './shared/PalettePlots'
import { Section } from '../shared/primitives'
import { PaletteInfoSection as PaletteInfoSectionBlock } from './shared/PaletteInfoSection'
import { usePageNav } from '../shared/usePageNav'
import { PaletteSettingBar2 } from './shared/PaletteSettingBar2'
import { PaletteVO } from '../../types'
import { getGeneratorInstance } from '../../core/astral'
import { getNextId } from '../../utils/getNextId'
import { $templates } from '../../stores/template'

export const Palette = () => {
    const { paletteId } = useParams()
    const navigate = useNavigate()

    usePageNav('Редактирование палитры', { to: '/dashboard/palettes' })

    const palettes = useUnit($palettes)
    const templates = useUnit($templates)
    const editedPalette = useUnit($editedPalette)

    useEffect(() => {
        if (paletteId) {
            const p = palettes.find(palette => palette.id === paletteId)
            if (p) setEditedPalette(p)
            else setEditedPalette(createDefaultPalette())
        } else {
            setEditedPalette(createDefaultPalette())
        }
    }, [paletteId])

    if (!editedPalette) {
        return <ContentLoader />
    }

    const {
        name,
        inputColor,
        scale: scaleProp,
        generator,
        processors,
        templateId: templateIdProp,
    } = editedPalette

    const template = templateIdProp ? templates.find(t => t.id === templateIdProp) : null

    const scale = scaleProp || template.scale

    const update = (changes: Partial<PaletteVO>) => {
        const newValue = { ...editedPalette, ...changes }

        const generatorProps = template || newValue
        const instance = getGeneratorInstance(generatorProps)
        const result = instance?.generate(newValue.inputColor)

        setEditedPalette({ ...newValue, ...result })
    }

    const updateName = (name: string) => {
        const newValue = { ...editedPalette, name }
        setEditedPalette(newValue)
    }

    const updateTemplateId = (templateId: string) => {
        const newValue = {
            ...editedPalette,
            templateId,
            ...(!templateId && createDefaultCommonPaletteSettings())
        }

        const template = templateId ? templates.find(t => t.id === templateId) : null

        const generatorProps = template || newValue
        const instance = getGeneratorInstance(generatorProps)
        const result = instance?.generate(newValue.inputColor)

        setEditedPalette({ ...newValue, ...result })
    }

    return (
        <PaletteRoot>
            <PaletteMainSection>
                <Section>
                    <PaletteInfoSection>
                        <Tabs defaultValue="palette">
                            <TabList>
                                <Tab value="palette">Палитра</Tab>
                                <Tab value="plots">Графики</Tab>
                            </TabList>

                            <TabPanel value="palette">
                                <DisplaySection>
                                    <PaletteInfoSectionBlock
                                        palette={editedPalette}
                                        scale={scale}
                                        onScaleChange={scale => update({ scale })}
                                        disabled={Boolean(templateIdProp)}
                                    />
                                </DisplaySection>
                            </TabPanel>

                            <TabPanel value="plots">
                                <PlotsSection>
                                    <PalettePlots
                                        palette={editedPalette}
                                    />
                                </PlotsSection>
                            </TabPanel>
                        </Tabs>
                    </PaletteInfoSection>
                </Section>

                <Section>
                    <PaletteSettingsAside>
                        <PaletteSettingBar2
                            name={name}
                            onNameChange={name => updateName(name)}
                            color={inputColor}
                            onColorChange={inputColor => update({ inputColor })}
                            processors={processors}
                            onProcessorsChange={processors => update({ processors })}
                            templateId={templateIdProp}
                            onTemplateIdChange={templateId => updateTemplateId(templateId)}
                            onSave={() => {
                                if (paletteId) {
                                    updatePalette(editedPalette)
                                } else {
                                    addPalette({
                                        ...editedPalette,
                                        id: getNextId(palettes)
                                    })
                                }
                                navigate('/dashboard/palettes', { replace: true })
                                setEditedPalette(null)
                            }}
                            palette={editedPalette}
                        />
                    </PaletteSettingsAside>
                </Section>
            </PaletteMainSection>
        </PaletteRoot>
    )
}

const PaletteRoot = styled.main({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
})

const PaletteMainSection = styled.main({
    display: 'grid',
    gridTemplateColumns: '1fr 384px',
    gap: '6px',
})

const PaletteInfoSection = styled.section({
    width: '100%',
    display: 'grid',
    // paddingInlineEnd: 'calc(24px + 384px + 24px)',
    rowGap: '24px',
})

const PaletteSettingsAside = styled.aside({
    // position: 'absolute',
    // insetBlock: '24px',
    // insetInlineEnd: '24px',
})

const DisplaySection = styled.section()

const PlotsSection = styled.section()
