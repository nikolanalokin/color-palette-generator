import styled from '@emotion/styled'
import { formatHex, okhsl, Okhsl } from 'culori'
import {
    Button,
    Field,
    FormGroup,
    IconButton,
    FieldLabel,
    OkhslColorPicker,
    Option2,
    Select2,
    Switch,
} from '../../components'
import { TextInput } from '../../components/inputs/TextInput'
import { NumberInput } from '../../components/inputs/NumberInput'
import { useEffect, useMemo, useState } from 'react'
import { ComplexHueShiftOptions, HueShiftOptions, PaletteInfo } from '../../core'
import { PaletteOptions } from '../../stores/app'
import { resetStyles } from '../../components/buttons/shared'
import { CheckIcon } from 'lucide-react'

export type PaletteSettingBarProps = {
    name?: string
    onNameChange?(value: string): void
    color?: Okhsl
    onColorChange?(value: Okhsl): void
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
    const hex = useMemo(() => formatHex(color), [color])
    const [hexString, setHexString] = useState(hex)
    useEffect(() => {
        setHexString(hex)
    }, [hex])
    const handleHexColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => onColorChange?.(okhsl(evt.target.value))
    const handleHexStringChange = (value: string) => {
        setHexString(value)
        const valueOkhsl = okhsl(value)
        if (valueOkhsl) onColorChange?.(valueOkhsl)
    }
    const updateOptions = (changes: Partial<PaletteOptions>) => {
        onOptionsChange?.({ ...options, ...changes })
    }
    const updateHueShiftOptions = (changes: Partial<ComplexHueShiftOptions>) => {
        onOptionsChange?.({ ...options, hueShift: { ...options.hueShift as ComplexHueShiftOptions, ...changes } })
    }
    return (
        <PaletteSettingBarRoot>
            {/* <Field>
                <FieldLabel>Название</FieldLabel>
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
                value={color}
                onChange={value => onColorChange?.(value)}
            />

            {/* <Field>
                <FieldLabel>Метод формирования палитры</FieldLabel>
                <Select
                    value={options.method}
                    onValueChange={value => updateOptions({
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
            </Field> */}

            <Field>
                <FieldLabel>Метод формирования палитры</FieldLabel>
                <Select2
                    value={options.method}
                    onValueChange={value => updateOptions({
                        method: value as PaletteOptions['method'],
                        lightnessFuncton: value === 'lightness' ? 'linear' : null,
                    })}
                >
                    <Option2 value="contrast">Линейное изменение контрастности по APCA</Option2>
                    <Option2 value="lightness">Функциональное изменение светлоты</Option2>
                </Select2>
            </Field>

            { options.method === 'lightness' ? (
                <Field>
                    <FieldLabel>Функция изменения светлоты</FieldLabel>
                    <Select2
                        value={options.lightnessFuncton}
                        onValueChange={value => updateOptions({
                            lightnessFuncton: value as PaletteOptions['lightnessFuncton']
                        })}
                    >
                        <Option2 value="linear">Линейная</Option2>
                        <Option2 value="bezier">Безье</Option2>
                    </Select2>
                </Field>
            ) : null }

            <FormGroup labelText="Изменение цветового тона">
                <SwitchContainer>
                    <Switch
                        checked={typeof options.hueShift === 'number'}
                        onValueChange={value => {
                            if (value) {
                                updateOptions({
                                    hueShift: 0
                                })
                            } else {
                                updateOptions({
                                    hueShift: {
                                        point1: 110,
                                        point2: 264,
                                        shift1: 0,
                                        shift2: 0,
                                    }
                                })
                            }
                        }}
                    />
                    <FieldLabel>Использовать фиксированный сдвиг</FieldLabel>
                </SwitchContainer>

                { typeof options.hueShift === 'number' ? (
                    <NumberInput
                        labelText="Величина сдвига"
                        step={1}
                        value={options.hueShift}
                        onValueChange={value => updateOptions({
                            hueShift: value
                        })}
                    />
                ) : (
                    <ComplexHueShiftContainer>
                        <NumberInput
                            labelText="hue 1"
                            min={0}
                            max={360}
                            step={1}
                            value={options.hueShift.point1}
                            onValueChange={value => updateHueShiftOptions({ point1: value })}
                        />
                        <NumberInput
                            labelText="hue 2"
                            min={0}
                            max={360}
                            step={1}
                            value={options.hueShift.point2}
                            onValueChange={value => updateHueShiftOptions({ point2: value })}
                        />
                        <NumberInput
                            labelText="hue shift 1"
                            step={1}
                            value={options.hueShift.shift1}
                            onValueChange={value => updateHueShiftOptions({ shift1: value })}
                        />
                        <NumberInput
                            labelText="hue shift 2"
                            step={1}
                            value={options.hueShift.shift2}
                            onValueChange={value => updateHueShiftOptions({ shift2: value })}
                        />
                    </ComplexHueShiftContainer>
                ) }
            </FormGroup>

            <FormGroup labelText="Изменение насыщенности">
                <NumberInput
                    id="decreaseSaturationRatio"
                    labelText="Коэффициент уменьшения насыщенности (%)"
                    min={0}
                    max={100}
                    step={1}
                    value={options.decreaseSaturationRatio * 100}
                    onValueChange={value => updateOptions({
                        decreaseSaturationRatio: value / 100
                    })}
                />
            </FormGroup>

            {/* <Checkbox
                id="fixBase"
                labelText="Зафиксировать входной цвет"
                checked={options.fixBase}
                onChange={value => updateOptions({ fixBase: value })}
            /> */}

            <Button onClick={() => onSave?.()}>
                Сохранить
            </Button>
        </PaletteSettingBarRoot>
    )
}

const PaletteSettingBarRoot = styled.div(
    ({}) => ({
        maxHeight: '100%',
        width: '384px',
        paddingInlineStart: '16px',
        paddingInlineEnd: '4px',
        paddingBlock: '16px',
        borderRadius: '16px',
        backgroundColor: 'rgba(255 255 255 / 0.5)',
        border: '1px solid rgba(255 255 255 / 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0 0 0 / 0.1)',
        display: 'grid',
        rowGap: '16px',
        overflowY: 'auto',
        scrollbarGutter: 'stable',
        overscrollBehaviorY: 'contain',
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
        color: 'rgba(0 0 0 / .6)',
    })
)

export const NameInput = styled.input(
    resetStyles,
    {
        fontSize: '1.5rem',
        fontWeight: 700,

        '&::placeholder': {
            color: 'rgba(0 0 0 / .6)',
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

const SwitchContainer = styled.div(
    ({}) => ({
        display: 'flex',
        columnGap: '8px',
        alignItems: 'center',
    })
)

const ComplexHueShiftContainer = styled.div(
    ({}) => ({
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
    })
)
