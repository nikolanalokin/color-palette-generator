import styled from '@emotion/styled'
import { formatHex, okhsl, Okhsl } from 'culori'
import { OkhslColorPicker, Select, SelectContent, SelectGroup, SelectInput, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components'
import { TextInput } from '../../components/inputs/TextInput'
import { Checkbox } from '../../components/inputs/Checkbox'
import { NumberInput } from '../../components/inputs/NumberInput'
import { useEffect, useState } from 'react'
import { Palette } from '../../core'

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
    const handleHexColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => updateValue({ color: okhsl(evt.target.value)})
    const handleHexStringChange = (value: string) => {
        setHexString(value)
        const valueOkhsl = okhsl(value)
        if (valueOkhsl) updateValue({ color: valueOkhsl })
    }
    return (
        <PaletteSettingBarRoot>
            {/* <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select> */}

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

            <OkhslColorPicker
                value={valueProp.color}
                onChange={value => updateValue({ color: value })}
            />

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
                labelText="Коэффициент уменьшения насыщенности (%)"
                min={0}
                max={100}
                step={1}
                value={valueProp.decreaseSaturationRatio * 100}
                onChange={value => updateValue({ decreaseSaturationRatio: value / 100 })}
            />

            <Checkbox
                id="fixBase"
                labelText="Зафиксировать входной цвет"
                checked={valueProp.fixBase}
                onChange={value => updateValue({ fixBase: value })}
            />
        </PaletteSettingBarRoot>
    )
}

const PaletteSettingBarRoot = styled.div(
    ({}) => ({
        display: 'grid',
        gap: '16px',
    })
)

const ColorRectContainer = styled.div(
    ({}) => ({
        aspectRatio: 16 / 9,
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
