import { useEffect } from 'react'
import styled from '@emotion/styled'
import { createPalette } from '../core'
import { PaletteSettingBar } from './shared/PaletteSettingBar'
import { PaletteInfoSection as PaletteInfoSectionBlock } from './shared/PaletteInfoSection'
import { $appPalettes, $editedPalette, addAppPalette, PaletteOptions, setEditedAppPalette, updateAppPalette } from '../stores/app'
import { useNavigate, useParams } from 'react-router-dom'
import { Okhsl, okhsl } from 'culori'
import { useUnit } from 'effector-react'
import { PalettePlots } from './shared/PalettePlots'
import { Tab, TabList, TabPanel, Tabs } from '../components'

function createDefaultColor () {
    return okhsl('#d03531')
}

function createDefaultOptions (): PaletteOptions {
    return {
        scale: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
        method: 'contrast',
        lightnessFuncton: null,
        hueShift: 5,
        decreaseSaturationRatio: .15,
    }
}

export const Palette = () => {
    const { paletteId } = useParams()
    const navigate = useNavigate()

    const palettes = useUnit($appPalettes)
    const editedPalette = useUnit($editedPalette)

    useEffect(() => {
        if (paletteId) {
            const p = palettes.find(palette => palette.id === paletteId)
            if (p) setEditedAppPalette(p)
            else setEditedAppPalette({
                id: null,
                color: createDefaultColor(),
                name: '',
                options: createDefaultOptions(),
                palette: createPalette(createDefaultColor(), createDefaultOptions()),
            })
        } else {
            setEditedAppPalette({
                id: null,
                color: createDefaultColor(),
                name: '',
                options: createDefaultOptions(),
                palette: createPalette(createDefaultColor(), createDefaultOptions()),
            })
        }
    }, [paletteId])

    if (!editedPalette) {
        return null
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
    display: 'flex',
    flexGrow: 1,
})

const PaletteInfoSection = styled.section({
    width: '100%',
    display: 'grid',
    paddingInline: '48px',
    paddingInlineEnd: 'calc(24px + 384px + 24px)',
    paddingBlock: '24px',
    rowGap: '24px',
})

const PaletteSettingsAside = styled.aside({
    position: 'fixed',
    insetBlock: '24px',
    insetInlineEnd: '24px',
})


const Section = styled.section()

const DisplaySection = styled(Section)()

const PlotsSection = styled(Section)()
