import styled from '@emotion/styled'
import { formatHex, okhsl, Okhsl } from 'culori'
import { Button, Field, IconButton, Label, OkhslColorPicker, Select, SelectContent, SelectGroup, SelectInput, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components'
import { TextInput } from '../../components/inputs/TextInput'
import { Checkbox } from '../../components/inputs/Checkbox'
import { NumberInput } from '../../components/inputs/NumberInput'
import { useEffect, useState } from 'react'
import { PaletteInfo } from '../../core'
import { PaletteOptions } from '../../stores/app'
import { resetStyles } from '../../components/buttons/shared'
import { CheckIcon } from 'lucide-react'

export type PaletteSettingBarValue = {
    color?: Okhsl
    method?: 'lightness' | 'contrast'
    lightnessFuncton?: 'linear' | 'bezier'
    fixBase?: boolean
    hueShift?: number
    decreaseSaturationRatio?: number
}

export type PaletteSettingBarProps = {
    name?: string
    onNameChange?(value: string): void
    color?: string
    onColorChange?(value: string): void
    options?: PaletteOptions
    onOptionsChange?(value: PaletteOptions): void
    palette?: PaletteInfo
    onSave?(): void
}

export const PaletteSettingBar = (props: PaletteSettingBarProps) => {
    const {
        name,
        onNameChange,
        color,
        onColorChange,
        options,
        onOptionsChange,
        palette,
        onSave,
    } = props
    const hex = color
    const [hexString, setHexString] = useState(hex)
    useEffect(() => {
        setHexString(hex)
    }, [hex])
    const updateValue = (changes: Partial<PaletteOptions>) => {
        const valueCopy = { ...options }
        Object.keys(changes).forEach(key => {
            valueCopy[key] = changes[key]
        })
        onOptionsChange?.(valueCopy)
    }
    const handleHexColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => onColorChange?.(formatHex(evt.target.value))
    const handleHexStringChange = (value: string) => {
        setHexString(value)
        const valueOkhsl = okhsl(value)
        if (valueOkhsl) onColorChange?.(value)
    }
    return (
        <PaletteSettingBarRoot>
            {/* <Field>
                <Label>Название</Label>
                <TextInput
                    id="name"
                    value={name}
                    onChange={value => onNameChange?.(value)}
                />
            </Field> */}

            <NameInputContainer>
                <NameInputRow>
                    <NameInput
                        value={name}
                        onChange={evt => onNameChange?.(evt.target.value)}
                        placeholder={palette.name}
                    />

                    <IconButton onClick={() => onNameChange?.(palette.name)}>
                        <CheckIcon />
                    </IconButton>
                </NameInputRow>

                { name ? <NameSuggestion>{ palette.name }</NameSuggestion> : null }
            </NameInputContainer>

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
                value={okhsl(hexString)}
                onChange={value => onColorChange?.(formatHex(value))}
            />

            <Field>
                <Label>Метод формирования палитры</Label>
                <Select
                    value={options.method}
                    onValueChange={value => updateValue({
                        method: value as PaletteOptions['method'],
                        ...(value === 'lightness' && {
                            lightnessFuncton: 'linear',
                        })
                    })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Выберете алгоритм генерации" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="contrast">Линейное изменение контрастности по APCA</SelectItem>
                        <SelectItem value="lightness">Функциональное изменение светлоты</SelectItem>
                    </SelectContent>
                </Select>
            </Field>

            { options.method === 'lightness' ? (
                <Field>
                    <Label>Функция изменения светлоты</Label>
                    <Select
                        value={options.lightnessFuncton}
                        onValueChange={value => updateValue({ lightnessFuncton: value as PaletteOptions['lightnessFuncton'] })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выберете функцию" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="linear">Линейная</SelectItem>
                            <SelectItem value="bezier">Безье</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
            ) : null }

            <NumberInput
                id="hueShift"
                labelText="Смещение цветового тона"
                step={1}
                value={options.hueShift}
                onChange={value => updateValue({ hueShift: value })}
            />

            <NumberInput
                id="decreaseSaturationRatio"
                labelText="Коэффициент уменьшения насыщенности (%)"
                min={0}
                max={100}
                step={1}
                value={options.decreaseSaturationRatio * 100}
                onChange={value => updateValue({ decreaseSaturationRatio: value / 100 })}
            />

            {/* <Checkbox
                id="fixBase"
                labelText="Зафиксировать входной цвет"
                checked={options.fixBase}
                onChange={value => updateValue({ fixBase: value })}
            /> */}
            <Button onClick={() => onSave?.()}>
                Сохранить
            </Button>
        </PaletteSettingBarRoot>
    )
}

const PaletteSettingBarRoot = styled.div(
    ({}) => ({
        paddingInline: '16px',
        paddingBlock: '16px',
        borderRadius: '16px',
        backgroundColor: 'rgba(255 255 255 / 0.2)',
        border: '1px solid rgba(255 255 255 / 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0 0 0 / 0.1)',
        display: 'grid',
        gap: '16px',
        overflowY: 'auto',
    })
)

const NameInputContainer = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '4px',
    })
)

const NameInputRow = styled.div(
    ({}) => ({
        display: 'flex',
        justifyContent: 'space-between',
    })
)

const NameSuggestion = styled.div(
    ({}) => ({
        fontSize: '.75rem',
        color: '#acacac',
    })
)

export const NameInput = styled.input(
    resetStyles,
    {
        fontSize: '1.5rem',
        fontWeight: 700,

        '&::placeholder': {
            color: '#acacac',
        },
    }
)

const ColorRectContainer = styled.div(
    ({}) => ({
        height: '64px',
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
