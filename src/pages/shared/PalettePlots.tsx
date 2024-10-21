import styled from '@emotion/styled'
import { Palette } from '../../core'
import { LinePlot } from '../../components'
import { useState } from 'react'
import { SelectInput } from '../../components/inputs/SelectInput'

export type PalettePlotsProps = {
    palette?: Palette
}

export const PalettePlots = (props: PalettePlotsProps) => {
    const { palette } = props
    const [colorSpace, setColorSpace] = useState('okhsl')
    const hueData = palette.shades.map<[number, number]>(shade => [shade.number, shade[colorSpace].hue]).slice(1, -1)
    const saturationData = palette.shades.map<[number, number]>(shade => [shade.number, shade[colorSpace].saturation]).slice(1, -1)
    const lightnessData = palette.shades.map<[number, number]>(shade => [shade.number, shade[colorSpace].lightness]).slice(1, -1)
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
            <StyledLinePlot
                data={hueData}
                xMin={0}
                xMax={1000}
                yMin={0}
                yMax={360}
            />
            <StyledLinePlot
                data={saturationData}
                xMin={0}
                xMax={1000}
                yMin={0}
                yMax={100}
            />
            <StyledLinePlot
                data={lightnessData}
                xMin={0}
                xMax={1000}
                yMin={0}
                yMax={100}
            />
        </PalettePlotsRoot>
    )
}

const PalettePlotsRoot = styled.div(
    ({}) => ({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '24px',
    })
)

const StyledLinePlot = styled(LinePlot)({
    width: '480px',
})

const Gradient = styled.div(
    ({}) => ({
        height: '48px',
        borderRadius: '8px',
    })
)
