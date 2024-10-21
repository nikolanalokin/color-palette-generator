import styled from '@emotion/styled'
import { formatHex, okhsl, Okhsl } from 'culori'
import { RangeInput } from '../../components'
import { TextInput } from '../../components/inputs/TextInput'
import { Checkbox } from '../../components/inputs/Checkbox'
import { NumberInput } from '../../components/inputs/NumberInput'

export type PaletteSettingBarProps = {
    color?: Okhsl
    onColorChange?(hex: Okhsl): void
    fixBase?: boolean
    onFixBaseChange?(value: boolean): void
    useApca?: boolean
    onUseApcaChange?(value: boolean): void
    hueShift?: number
    onHueShiftChange?(value: number): void
    decreaseSaturationRatio?: number
    onDecreaseSaturationRatioChange?(value: number): void
}

export const PaletteSettingBar = (props: PaletteSettingBarProps) => {
    const {
        color,
        onColorChange,
        fixBase,
        onFixBaseChange,
        useApca,
        onUseApcaChange,
        hueShift,
        onHueShiftChange,
        decreaseSaturationRatio,
        onDecreaseSaturationRatioChange,
    } = props
    const hex = formatHex(color)
    const hue = color.h
    const handleHueChange = (value: number) => onColorChange?.({ ...color, h: value, })
    const saturation = color.s * 100
    const handleSaturationChange = (value: number) => onColorChange?.({ ...color, s: value / 100, })
    const lightness = color.l * 100
    const handleLightnessChange = (value: number) => onColorChange?.({ ...color, l: value / 100, })
    const handleHexColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => onColorChange?.(okhsl(evt.target.value))
    const handleHexStringChange = (value: string) => onColorChange?.(okhsl(value))
    return (
        <PaletteSettingBarRoot>
            <HexContainer>
                <ColorRectContainer>
                    <ColorRect
                        type="color"
                        value={hex}
                        onChange={handleHexColorChange}
                    />
                </ColorRectContainer>
                <TextInput
                    id="hex"
                    value={hex}
                    onChange={handleHexStringChange}
                />
            </HexContainer>

            <HslContainer>
                <RangeInput
                    id="hue"
                    labelText="hue"
                    value={hue}
                    onChange={handleHueChange}
                    min={0}
                    max={360}
                />
                <RangeInput
                    id="saturation"
                    labelText="saturation"
                    value={saturation}
                    onChange={handleSaturationChange}
                    min={0}
                    max={100}
                />
                <RangeInput
                    id="lightness"
                    labelText="lightness"
                    value={lightness}
                    onChange={handleLightnessChange}
                    min={0}
                    max={100}
                />
            </HslContainer>

            <PaletteOptionsContainer>
                <Column>
                    <Checkbox
                        id="useApca"
                        labelText="Подогнать цвета под фиксированные значения контрастности"
                        checked={useApca}
                        onChange={onUseApcaChange}
                    />

                    <Checkbox
                        id="fixBase"
                        labelText="Зафиксировать входной цвет"
                        checked={fixBase}
                        onChange={onFixBaseChange}
                        disabled={!useApca}
                    />
                </Column>

                <Column>
                    <NumberInput
                        id="hueShift"
                        labelText="Смещение цветового тона"
                        step={1}
                        value={hueShift}
                        onChange={onHueShiftChange}
                    />

                    <NumberInput
                        id="decreaseSaturationRatio"
                        labelText="Коэффициент уменьшения насыщенности"
                        defaultValue={.75}
                        min={0}
                        step={.01}
                        max={1}
                        value={decreaseSaturationRatio}
                        onChange={onDecreaseSaturationRatioChange}
                    />
                </Column>
            </PaletteOptionsContainer>
        </PaletteSettingBarRoot>
    )
}

const PaletteSettingBarRoot = styled.div(
    ({}) => ({
        // minWidth: '512px',
        display: 'grid',
        gridTemplateColumns: '20% 1fr',
        gap: '24px',
    })
)

const Row = styled.div(
    ({}) => ({
        display: 'flex',
        columnGap: '12px',
    })
)

const Column = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '12px',
        flexGrow: 1,
    })
)

const HexContainer = styled.div(
    ({}) => ({
        gridRow: 'span 2',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '12px',
    })
)

const HslContainer = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '12px',
    })
)

const PaletteOptionsContainer = styled(Row)({})

const ColorRectContainer = styled(Row)(
    ({}) => ({
        aspectRatio: 1,
    })
)

const ColorRect = styled.input`
    height: 100%;
    width: 100%;
    border-radius: 4px;

    appearance: none;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    &::-webkit-color-swatch {
        border: none;
    }
`
