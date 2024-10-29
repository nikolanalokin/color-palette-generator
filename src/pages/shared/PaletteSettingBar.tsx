import styled from '@emotion/styled'
import { formatHex, okhsl, Okhsl } from 'culori'
import { OkhslColorPicker, RangeInput, SelectInput } from '../../components'
import { TextInput } from '../../components/inputs/TextInput'
import { Checkbox } from '../../components/inputs/Checkbox'
import { NumberInput } from '../../components/inputs/NumberInput'
import { useEffect, useState } from 'react'
import { contrastAPCA, Palette } from '../../core'

export type PaletteSettingBarValue = {
    color?: Okhsl
    method?: 'lightness' | 'apca'
    fixBase?: boolean
    hueShift?: number
    decreaseSaturationRatio?: number
}

export type PaletteSettingBarProps = {
    value?: PaletteSettingBarValue
    onChange?(value: PaletteSettingBarValue): void
    palette?: Palette
}

export const PaletteSettingBar = (props: PaletteSettingBarProps) => {
    const {
        value: valueProp = {},
        onChange,
        palette,
    } = props
    const hex = formatHex(valueProp.color)
    // const hue = valueProp.color.h
    const [hexString, setHexString] = useState(hex)
    useEffect(() => {
        setHexString(hex)
    }, [hex])
    const updateValue = (changes: Partial<PaletteSettingBarValue>) => {
        const valueCopy = { ...valueProp }
        Object.keys(changes).forEach(key => {
            valueCopy[key] = changes[key]
        })
        onChange?.(valueCopy)
    }
    // const handleHueChange = (value: number) => updateValue({ color: { ...valueProp.color, h: value, }})
    // const saturation = valueProp.color.s * 100
    // const handleSaturationChange = (value: number) => updateValue({ color: { ...valueProp.color, s: value / 100, }})
    // const lightness = valueProp.color.l * 100
    // const handleLightnessChange = (value: number) => updateValue({ color: { ...valueProp.color, l: value / 100, }})
    const handleHexColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => updateValue({ color: okhsl(evt.target.value)})
    const handleHexStringChange = (value: string) => {
        setHexString(value)
        const valueOkhsl = okhsl(value)
        if (valueOkhsl) updateValue({ color: valueOkhsl })
    }
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
                    value={hexString}
                    onChange={handleHexStringChange}
                />
            </HexContainer>

            <HslContainer>
                <OkhslColorPicker
                    value={valueProp.color}
                    onChange={value => updateValue({ color: value })}
                />
                {/* <RangeInput
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
                    step={.01}
                />
                <RangeInput
                    id="lightness"
                    labelText="lightness"
                    value={lightness}
                    onChange={handleLightnessChange}
                    min={0}
                    max={100}
                    step={.01}
                /> */}
            </HslContainer>

            <PaletteOptionsContainer>
                <SelectInput
                    id="method"
                    labelText="Метод формирования палитры"
                    value={valueProp.method}
                    onChange={value => updateValue({ method: value as PaletteSettingBarValue['method'] })}
                >
                    <option value="apca">Линейное изменение контрастности по APCA</option>
                    <option value="lightness">Нелинейное изменение светлоты</option>
                </SelectInput>

                <NumberInput
                    id="hueShift"
                    labelText="Смещение цветового тона"
                    step={1}
                    value={valueProp.hueShift}
                    onChange={value => updateValue({ hueShift: value })}
                />

                <NumberInput
                    id="decreaseSaturationRatio"
                    labelText="Коэффициент уменьшения насыщенности"
                    defaultValue={.75}
                    min={0}
                    step={.01}
                    max={1}
                    value={valueProp.decreaseSaturationRatio}
                    onChange={value => updateValue({ decreaseSaturationRatio: value })}
                />

                <Checkbox
                    id="fixBase"
                    labelText="Зафиксировать входной цвет"
                    checked={valueProp.fixBase}
                    onChange={value => updateValue({ fixBase: value })}
                />
            </PaletteOptionsContainer>

            {/* <Column>
                <Checkbox labelText="Задать контрастность вручную" />
                <Row>
                    { palette.shades.map(shade => (
                        <Column key={shade.number}>
                            <NumberInput
                                id={`l-${shade.number}`}
                                labelText={shade.number.toString()}
                                value={round(contrastAPCA('black', shade.hex))}
                                readOnly
                                css={{ width: '75px' }}
                            />
                            <NumberInput
                                id={`l-${shade.number}`}
                                labelText={shade.number.toString()}
                                value={round(contrastAPCA('white', shade.hex))}
                                readOnly
                                css={{ width: '75px' }}
                            />
                        </Column>
                    ))}
                </Row>
            </Column> */}
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

const PaletteOptionsContainer = styled(Column)({
    alignItems: 'flex-start'
})

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
