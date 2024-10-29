import styled from '@emotion/styled'
import { Palette } from '../../core'
import { LinePlot, PlotContainer } from '../../components'
import { useState } from 'react'
import { SelectInput } from '../../components/inputs/SelectInput'
import { Section } from './primitives'

export type PalettePlotsProps = {
    palette?: Palette
}

export const PalettePlots = (props: PalettePlotsProps) => {
    const { palette } = props
    const [colorSpace, setColorSpace] = useState('okhsl')
    const data = palette.shades.slice(1, -1)
    return (
        <PalettePlotsRoot>
            <SelectInput
                id="colorSpace"
                labelText="Цветовое пространство"
                value={colorSpace}
                onChange={setColorSpace}
            >
                <option value="okhsl">OKHSL</option>
                <option value="hsl">HSL</option>
            </SelectInput>
            <PlotsContainer>
                <Section area="huePlot">
                    <PlotContainer>
                        { size => (
                            <StyledLinePlot
                                {...size}
                                data={data}
                                getX={s => s.number}
                                getY={s => s[colorSpace].h}
                                xDomain={[0, 1000]}
                                yDomain={[0, 360]}
                            />
                        ) }
                    </PlotContainer>
                </Section>
                <Section area="saturationPlot">
                    <PlotContainer>
                        { size => (
                            <StyledLinePlot
                                {...size}
                                data={data}
                                getX={s => s.number}
                                getY={s => s[colorSpace].s}
                                xDomain={[0, 1000]}
                                yDomain={[0, 1]}
                            />
                        ) }
                    </PlotContainer>
                </Section>
                <Section area="lightnessPlot">
                    <PlotContainer>
                        { size => (
                            <StyledLinePlot
                                {...size}
                                data={data}
                                getX={s => s.number}
                                getY={s => s[colorSpace].l}
                                xDomain={[0, 1000]}
                                yDomain={[0, 1]}
                            />
                        ) }
                    </PlotContainer>
                </Section>
            </PlotsContainer>
        </PalettePlotsRoot>
    )
}

const PalettePlotsRoot = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '24px',
    })
)

const PlotsContainer = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '24px',

        '@media (max-width: 1600px)': {
            flexDirection: 'row',
            columnGap: '16px',
        },
    })
)

const StyledLinePlot = styled(LinePlot)({
    width: '420px',
})
