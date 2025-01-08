import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { Okhsl } from 'culori'
import { useUnit } from 'effector-react'
import { ArrowLeftIcon } from 'lucide-react'
import { ContentLoader, Toolbar, IconButton, Tabs, TabList, Tab, TabPanel } from '../../components'
import { createPalette } from '../../core'
import { $appPalettes, $editedPalette, setEditedAppPalette, createDefaultAppPalette, PaletteOptions, updateAppPalette, addAppPalette } from '../../stores'
import { PalettePlots } from '../shared/PalettePlots'
import { PaletteSettingBar } from '../shared/PaletteSettingBar'
import { VerticalDivider, PageTitle } from '../shared/primitives'
import { PaletteInfoSection as PaletteInfoSectionBlock } from '../shared/PaletteInfoSection'
import { usePageNav } from '../shared/usePageNav'

export const Palette = () => {
    const { paletteId } = useParams()
    const navigate = useNavigate()

    usePageNav('Редактирование палитры', { to: '/dashboard' })

    const palettes = useUnit($appPalettes)
    const editedPalette = useUnit($editedPalette)

    useEffect(() => {
        if (paletteId) {
            const p = palettes.find(palette => palette.id === paletteId)
            if (p) setEditedAppPalette(p)
            else setEditedAppPalette(createDefaultAppPalette())
        } else {
            setEditedAppPalette(createDefaultAppPalette())
        }
    }, [paletteId])

    if (!editedPalette) {
        return <ContentLoader />
    }

    const {
        name,
        color,
        options,
        palette,
    } = editedPalette

    const updateName = (name: string) => {
        setEditedAppPalette({ ...editedPalette, name })
    }

    const updateColor = (color: Okhsl) => {
        const newPalette = createPalette(color, options)
        setEditedAppPalette({ ...editedPalette, color, palette: newPalette })
    }

    const updateOptions = (options: PaletteOptions) => {
        const newPalette = createPalette(color, options)
        setEditedAppPalette({ ...editedPalette, options, palette: newPalette })
    }

    return (
        <PaletteRoot>
            <PaletteInfoSection>
                <Tabs defaultValue="palette">
                    <TabList>
                        <Tab value="palette">Палитра</Tab>
                        <Tab value="plots">Графики</Tab>
                    </TabList>

                    <TabPanel value="palette">
                        <DisplaySection>
                            <PaletteInfoSectionBlock
                                palette={palette}
                                options={options}
                                onOptionsChange={value => updateOptions(value)}
                            />
                        </DisplaySection>
                    </TabPanel>

                    <TabPanel value="plots">
                        <PlotsSection>
                            <PalettePlots
                                palette={palette}
                            />
                        </PlotsSection>
                    </TabPanel>
                </Tabs>
            </PaletteInfoSection>

            <PaletteSettingsAside>
                <PaletteSettingBar
                    name={name}
                    onNameChange={value => updateName(value)}
                    color={color}
                    onColorChange={value => updateColor(value)}
                    options={options}
                    onOptionsChange={value => updateOptions(value)}
                    onSave={() => {
                        if (paletteId) {
                            updateAppPalette(editedPalette)
                        } else {
                            addAppPalette(editedPalette)
                        }
                        navigate('/dashboard', { replace: true })
                        setEditedAppPalette(null)
                    }}
                    palette={palette}
                />
            </PaletteSettingsAside>
        </PaletteRoot>
    )
}

const PaletteRoot = styled.main({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
})

const PaletteInfoSection = styled.section({
    width: '100%',
    display: 'grid',
    paddingInlineEnd: 'calc(24px + 384px + 24px)',
    rowGap: '24px',
})

const PaletteSettingsAside = styled.aside({
    position: 'absolute',
    insetBlock: '24px',
    insetInlineEnd: '24px',
})


const Section = styled.section()

const DisplaySection = styled(Section)()

const PlotsSection = styled(Section)()
