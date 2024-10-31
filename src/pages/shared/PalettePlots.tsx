import styled from '@emotion/styled'
import { Palette } from '../../core'
import { LinePlot, PlotContainer } from '../../components'
import { useState } from 'react'
import { SelectInput } from '../../components/inputs/SelectInput'
import { Section } from './primitives'
import { PlotLinePlot } from '../../components/plots/PlotLinePlot'

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
                {/* <Section area="huePlot">
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
                </Section> */}
                <Section area="huePlot">
                    <PlotLinePlot
                        data={data}
                        getX={d => d.number}
                        getY={d => d[colorSpace].h}
                        xDomain={[0, 1000]}
                        yDomain={[0, 360]}
                        xLabel="tone"
                        yLabel="hue"
                    />
                </Section>
                <Section area="saturationPlot">
                    <PlotLinePlot
                        data={data}
                        getX={d => d.number}
                        getY={d => d[colorSpace].s}
                        xDomain={[0, 1000]}
                        yDomain={[0, 1]}
                        xLabel="tone"
                        yLabel="saturation"
                    />
                </Section>
                <Section area="lightnessPlot">
                    <PlotLinePlot
                        data={data}
                        getX={d => d.number}
                        getY={d => d[colorSpace].l}
                        xDomain={[0, 1000]}
                        yDomain={[0, 1]}
                        xLabel="tone"
                        yLabel="lightness"
                    />
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
