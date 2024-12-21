import styled from '@emotion/styled'
import { PaletteInfo, ShadeInfo } from '../../core'
import { PlotLinePlot, PlotLinePlotProps } from '../../components'
import { useMemo, useState } from 'react'
import { Section } from './primitives'
import { ToggleButtonGroup } from '../../components/buttons/ToggleButtonGroup'
import { ToggleButton } from '../../components/buttons/ToggleButton'
import { useUnit } from 'effector-react'
import { $editedPaletteShadesMap } from '../../stores/app'

export type PalettePlotsProps = {
    palette?: PaletteInfo
}

type ColorSpace =
    | 'okhsl'
    | 'hsl'
    | 'rgb'

type PlotDef = Pick<PlotLinePlotProps, 'getY' | 'yDomain' | 'yLabel'>

const plotsPropsDict: Record<ColorSpace, PlotDef[]> = {
    okhsl: [
        {
            getY: (d: ShadeInfo) => d.okhsl.h,
            yDomain: [0, 360],
            yLabel: 'hue',
        },
        {
            getY: (d: ShadeInfo) => d.okhsl.s,
            yDomain: [0, 1],
            yLabel: 'saturation',
        },
        {
            getY: (d: ShadeInfo) => d.okhsl.l,
            yDomain: [0, 1],
            yLabel: 'lightness',
        },
    ],
    hsl: [
        {
            getY: (d: ShadeInfo) => d.hsl.h,
            yDomain: [0, 360],
            yLabel: 'hue',
        },
        {
            getY: (d: ShadeInfo) => d.hsl.s,
            yDomain: [0, 1],
            yLabel: 'saturation',
        },
        {
            getY: (d: ShadeInfo) => d.hsl.l,
            yDomain: [0, 1],
            yLabel: 'lightness',
        },
    ],
    rgb: [
        {
            getY: (d: ShadeInfo) => d.rgb.r * 255,
            yDomain: [0, 255],
            yLabel: 'red',
        },
        {
            getY: (d: ShadeInfo) => d.rgb.g * 255,
            yDomain: [0, 255],
            yLabel: 'green',
        },
        {
            getY: (d: ShadeInfo) => d.rgb.b * 255,
            yDomain: [0, 255],
            yLabel: 'blue',
        },
    ],
}

const options: Array<{ value: ColorSpace, label: string }> = [
    { value: 'okhsl', label: 'OKHSL' },
    { value: 'hsl', label: 'HSL' },
    { value: 'rgb', label: 'RGB' },
]

export const PalettePlots = (props: PalettePlotsProps) => {
    const { palette } = props
    const editedPaletteShadesMap = useUnit($editedPaletteShadesMap)
    const [colorSpace, setColorSpace] = useState<string>(options[0].value)
    const data = palette.shades.slice(1, -1)
    const plotsProps = useMemo<PlotDef[]>(() => {
        return plotsPropsDict[colorSpace]
    }, [colorSpace])
    return (
        <PalettePlotsRoot>
            <ToggleButtonGroup value={colorSpace} onValueChange={setColorSpace}>
                { options.map(option => (
                    <ToggleButton key={option.value} value={option.value}>
                        { option.label }
                    </ToggleButton>
                )) }
            </ToggleButtonGroup>

            <PlotsContainer>
                { plotsProps.map((plotProps) => (
                    <Section key={plotProps.yLabel}>
                        <PlotLinePlot
                            data={data}
                            getX={d => d.number}
                            xDomain={[0, 1000]}
                            xLabel="tone"
                            dotFill={d => editedPaletteShadesMap.get(d[0]).hex}
                            {...plotProps}
                        />
                    </Section>
                )) }

                <Section>
                    <PlotLinePlot
                        data={data}
                        getX={d => d.number}
                        getY={d => d.delta}
                        xDomain={[0, 1000]}
                        yDomain={[0, 100]}
                        xLabel="tone"
                        yLabel="ΔE"
                        dotFill={d => editedPaletteShadesMap.get(d[0]).hex}
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
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
    })
)
