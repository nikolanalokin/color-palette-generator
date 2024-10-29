import { useState } from 'react'
import styled from '@emotion/styled'
import { PaletteSettingBar, PaletteSettingBarValue } from './shared/PaletteSettingBar'
import { PaletteContrastTable } from './shared/PaletteContrastTable'
import { createPalette } from '../core'
import { formatHex, okhsl } from 'culori'
import { PalettePlots } from './shared/PalettePlots'
import { GlobalStyles } from '../components'
import { PaletteDisplayBlock } from './shared/PaletteDisplayBlock'

export const App = () => {
    const [options, setOptions] = useState<PaletteSettingBarValue>({
        color: okhsl('#d03531'),
        fixBase: false,
        method: 'apca',
        hueShift: 5,
        decreaseSaturationRatio: .75,
    })
    const palette = createPalette({
        baseColor: formatHex(options.color),
        method: options.method,
        fixBase: options.fixBase,
        hueShift: options.hueShift,
        decreaseSaturationRatio: options.decreaseSaturationRatio,
    })
    return (
        <>
            <GlobalStyles />
            <Root>
                <Main>
                    <SettingBarSection>
                        <PaletteSettingBar
                            value={options}
                            onChange={value => {
                                setOptions(value)
                            }}
                            palette={palette}
                        />
                    </SettingBarSection>
                    <PlotsSection>
                        <PalettePlots
                            palette={palette}
                        />
                    </PlotsSection>
                    <DisplaySection>
                        <PaletteDisplayBlock
                            palette={palette}
                        />
                    </DisplaySection>
                    <ContrastTableSection>
                        <PaletteContrastTable
                            palette={palette}
                        />
                    </ContrastTableSection>
                </Main>
                <Footer>
                    @nikolanalokin { new Date().getFullYear() }
                </Footer>
            </Root>
        </>
    )
}

const Root = styled.div(
    () => ({
        maxWidth: '100%',
    })
)

const Main = styled.main({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateAreas: `
        "settingBar plots"
        "display plots"
        "contrastTable contrastTable"
    `,

    '@media (max-width: 1600px)': {
        gridTemplateAreas: `
            "settingBar settingBar"
            "plots plots"
            "display display"
            "contrastTable contrastTable"
        `,
    },
})

const Section = styled.section({
    padding: '48px',
})

const SettingBarSection = styled(Section)({
    gridArea: 'settingBar',
    borderBlockEnd: '1px solid',
})

const PlotsSection = styled(Section)({
    gridArea: 'plots',
    borderInlineStart: '1px solid',

    '@media (max-width: 1600px)': {
        borderInlineStart: 'none',
        borderBlockEnd: '1px solid',
    },
})

const DisplaySection = styled(Section)({
    gridArea: 'display',
})

const ContrastTableSection = styled(Section)({
    gridArea: 'contrastTable',
    borderBlockStart: '1px solid',
    borderBlockEnd: '1px solid',
})

const Footer = styled(Section)({
    paddingInline: '48px',
    paddingBlock: '24px',
    fontSize: '14px',
})
