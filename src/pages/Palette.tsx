import { useState } from 'react'
import styled from '@emotion/styled'
import { createPalette } from '../core'
import { PaletteSettingBar, PaletteSettingBarValue } from './shared/PaletteSettingBar'
import { formatHex, okhsl } from 'culori'
import { PaletteDisplayBlock } from './shared/PaletteDisplayBlock'
import { PalettePlots } from './shared/PalettePlots'
import { PaletteContrastTable } from './shared/PaletteContrastTable'
import { PaletteInfoSection as PaletteInfoSectionBlock } from './shared/PaletteInfoSection'

export const Palette = () => {
    const [options, setOptions] = useState<PaletteSettingBarValue>({
        color: okhsl('#d03531'),
        fixBase: false,
        method: 'apca',
        lightnessFuncton: null,
        hueShift: 5,
        decreaseSaturationRatio: .15,
    })

    const palette = createPalette({
        baseColor: formatHex(options.color),
        method: options.method,
        fixBase: options.fixBase,
        hueShift: options.hueShift,
        decreaseSaturationRatio: options.decreaseSaturationRatio,
    })

    return (
        <PaletteRoot>
            <PaletteInfoSection>
                <DisplaySection>
                    <PaletteInfoSectionBlock
                        palette={palette}
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
                    value={options}
                    onChange={value => {
                        setOptions(value)
                    }}
                    palette={palette}
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
    paddingInline: '24px',
    paddingBlock: '24px',
    fontSize: '14px',
    borderInlineStart: '1px solid',
})


const Section = styled.section()

const PlotsSection = styled(Section)()

const DisplaySection = styled(Section)()

const ContrastTableSection = styled(Section)()
