import { useState } from 'react'
import styled from '@emotion/styled'
import { PaletteSettingBar } from './shared/PaletteSettingBar'
import { PaletteContrastTable } from './shared/PaletteContrastTable'
import { createPaletteWithOkhsl } from '../core'
import { formatHex, okhsl, Okhsl } from 'culori'
import { PalettePlots } from './shared/PalettePlots'
import { GlobalStyles } from '../components'
import { PaletteDisplayBlock } from './shared/PaletteDisplayBlock'

export const App = () => {
    const [color, setColor] = useState<Okhsl>(okhsl('#d03531'))
    const [useApca, setUseApca] = useState<boolean>(true)
    const [fixBase, setFixBase] = useState<boolean>(false)
    const [hueShift, setHueShift] = useState<number>(5)
    const [decreaseSaturationRatio, setDecreaseSaturationRatio] = useState<number>(.75)
    const palette = createPaletteWithOkhsl({
        baseColor: formatHex(color),
        fixBase: fixBase,
        useApca: useApca,
        hueShift: hueShift,
        decreaseSaturationRatio: decreaseSaturationRatio,
    })
    return (
        <>
            <GlobalStyles />
            <Root>
                <Main>
                    <SettingBarSection>
                        <PaletteSettingBar
                            color={color}
                            onColorChange={setColor}
                            useApca={useApca}
                            onUseApcaChange={value => {
                                setUseApca(value)
                                if (!value) setFixBase(false)
                            }}
                            fixBase={fixBase}
                            onFixBaseChange={setFixBase}
                            hueShift={hueShift}
                            onHueShiftChange={setHueShift}
                            decreaseSaturationRatio={decreaseSaturationRatio}
                            onDecreaseSaturationRatioChange={setDecreaseSaturationRatio}
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
    `
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
