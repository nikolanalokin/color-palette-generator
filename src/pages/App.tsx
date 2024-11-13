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
        <>
            <GlobalStyles />
            <Root>
                <Header>Генератор цветовых палитр</Header>
                <Main>
                    <DisplaySection>
                        <PaletteDisplayBlock
                            palette={palette}
                        />
                    </DisplaySection>
                    <PlotsSection>
                        <PalettePlots
                            palette={palette}
                        />
                    </PlotsSection>
                    <ContrastTableSection>
                        <PaletteContrastTable
                            palette={palette}
                        />
                    </ContrastTableSection>
                </Main>
                <Sidebar>
                    <PaletteSettingBar
                        value={options}
                        onChange={value => {
                            setOptions(value)
                        }}
                        palette={palette}
                    />
                </Sidebar>
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
        display: 'grid',
        gridTemplateColumns: '1fr 384px',
        gridTemplateAreas: `
            "header header"
            "main aside"
            "footer aside"
        `,
    })
)

const Main = styled.main({
    gridArea: 'main',
    display: 'grid',
    paddingInline: '48px',
    paddingBlock: '24px',
    gap: '24px',
})

const Section = styled.section({
})

const PlotsSection = styled(Section)({
})

const DisplaySection = styled(Section)({
})

const ContrastTableSection = styled(Section)({
})

const Header = styled.header({
    gridArea: 'header',
    paddingInline: '48px',
    paddingBlock: '24px',
    fontSize: '18px',
    fontWeight: 600,
    borderBlockEnd: '1px solid',
})

const Footer = styled.footer({
    gridArea: 'footer',
    paddingInline: '48px',
    paddingBlock: '24px',
    fontSize: '14px',
    borderBlockStart: '1px solid',
})

const Sidebar = styled.aside({
    gridArea: 'aside',
    paddingInline: '24px',
    paddingBlock: '24px',
    fontSize: '14px',
    borderInlineStart: '1px solid',
})
