import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { createPalette } from '../core'
import { PaletteSettingBar, PaletteSettingBarValue } from './shared/PaletteSettingBar'
import { formatHex, okhsl } from 'culori'
import { PaletteDisplayBlock } from './shared/PaletteDisplayBlock'
import { PalettePlots } from './shared/PalettePlots'
import { PaletteContrastTable } from './shared/PaletteContrastTable'
import { PaletteInfoSection as PaletteInfoSectionBlock } from './shared/PaletteInfoSection'
import { addPalette, PaletteOptions, setEditedPalette, updatePalette, useAppStore } from '../stores/app'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getNearestColorNames } from '../core/utils'

const DEFAULT_COLOR = '#d03531'
const DEFAULT_OPTIONS: PaletteOptions = {
    method: 'contrast',
    lightnessFuncton: null,
    hueShift: 5,
    decreaseSaturationRatio: .15,
}

export const Palette = () => {
    const { paletteId } = useParams()
    const navigate = useNavigate()

    const palettes = useAppStore(state => state.palettes)
    const editedPalette = useAppStore(state => state.editedPalette)

    useEffect(() => {
        if (paletteId) {
            const p = palettes.find(palette => palette.id === paletteId)
            if (p) setEditedPalette(p)
            else setEditedPalette({
                id: null,
                color: DEFAULT_COLOR,
                name: '',
                options: DEFAULT_OPTIONS,
                palette: createPalette(DEFAULT_COLOR, DEFAULT_OPTIONS),
            })
        } else {
            setEditedPalette({
                id: null,
                color: DEFAULT_COLOR,
                name: '',
                options: DEFAULT_OPTIONS,
                palette: createPalette(DEFAULT_COLOR, DEFAULT_OPTIONS),
            })
        }
    }, [paletteId])

    const updateName = (name: string) => {
        console.log('updateName', name)
        setEditedPalette({ ...editedPalette, name })
    }

    const updateColor = (color: string) => {
        console.log('updateColor', color)
        const newPalette = createPalette(color, editedPalette.options)
        setEditedPalette({ ...editedPalette, color, palette: newPalette })
    }

    const updateOptions = (options: PaletteOptions) => {
        console.log('updateOptions', options)
        const newPalette = createPalette(editedPalette.color, options)
        setEditedPalette({ ...editedPalette, options, palette: newPalette })
    }

    if (!editedPalette) {
        return null
    }

    return (
        <PaletteRoot>
            <PaletteInfoSection>
                <DisplaySection>
                    <PaletteInfoSectionBlock
                        palette={editedPalette.palette}
                    />
                </DisplaySection>

                {/* <DisplaySection>
                    <PaletteDisplayBlock
                        palette={palette}
                    />
                </DisplaySection> */}
{/*
                <PlotsSection>
                    <PalettePlots
                        palette={palette}
                    />
                </PlotsSection>

                <ContrastTableSection>
                    <PaletteContrastTable
                        palette={palette}
                    />
                </ContrastTableSection> */}
            </PaletteInfoSection>

            <PaletteSettingsAside>
                <PaletteSettingBar
                    name={editedPalette.name}
                    onNameChange={value => updateName(value)}
                    color={editedPalette.color}
                    onColorChange={value => updateColor(value)}
                    options={editedPalette.options}
                    onOptionsChange={value => updateOptions(value)}
                    onSave={() => {
                        if (paletteId) {
                            updatePalette(editedPalette)
                        } else {
                            addPalette(editedPalette)
                        }
                        navigate('/dashboard', { replace: true })
                        setEditedPalette(null)
                    }}
                    palette={editedPalette.palette}
                />
            </PaletteSettingsAside>
        </PaletteRoot>
    )
}

const PaletteRoot = styled.main({
    display: 'flex',
})

const PaletteInfoSection = styled.section({
    display: 'grid',
    paddingInline: '48px',
    paddingBlock: '24px',
    gap: '24px',
})

const PaletteSettingsAside = styled.aside({
    position: 'fixed',
    insetBlock: '24px',
    insetInlineEnd: '24px',
})


const Section = styled.section()

const PlotsSection = styled(Section)()

const DisplaySection = styled(Section)()

const ContrastTableSection = styled(Section)()
