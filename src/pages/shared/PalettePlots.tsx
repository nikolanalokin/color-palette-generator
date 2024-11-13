import styled from '@emotion/styled'
import { Palette } from '../../core'
import { Field, Label, PlotLinePlot, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components'
import { useState } from 'react'
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
            <Field>
                <Label>Цветовое пространство</Label>
                <Select
                    value={colorSpace}
                    onValueChange={setColorSpace}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Выберете цветовое пространство" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="okhsl">OKHSL</SelectItem>
                        <SelectItem value="hsl">HSL</SelectItem>
                    </SelectContent>
                </Select>
            </Field>
            <PlotsContainer>
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
        alignItems: 'flex-start',
        rowGap: '24px',
    })
)

const PlotsContainer = styled.div(
    ({}) => ({
        display: 'flex',
        columnGap: '24px',
    })
)
