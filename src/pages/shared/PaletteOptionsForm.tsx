import styled from '@emotion/styled'
import {
    Field,
    FormGroup,
    FieldLabel,
    Option2,
    Select2,
    Switch,
    Form,
} from '../../components'
import { NumberInput } from '../../components/inputs/NumberInput'
import { ComplexHueShiftOptions } from '../../core'
import { PaletteOptions } from '../../stores'

export type PaletteOptionsFormProps = {
    options?: PaletteOptions
    onOptionsChange?(value: PaletteOptions): void
}

export const PaletteOptionsForm = (props: PaletteOptionsFormProps) => {
    const {
        options,
        onOptionsChange,
    } = props
    const updateOptions = (changes: Partial<PaletteOptions>) => {
        onOptionsChange?.({ ...options, ...changes })
    }
    const updateHueShiftOptions = (changes: Partial<ComplexHueShiftOptions>) => {
        onOptionsChange?.({ ...options, hueShift: { ...options.hueShift as ComplexHueShiftOptions, ...changes } })
    }
    return (
        <PaletteOptionsFormRoot>
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
                        checked={typeof options.hueShift !== 'number'}
                        onValueChange={value => {
                            if (value) {
                                updateOptions({
                                    hueShift: {
                                        point1: 110,
                                        point2: 264,
                                        shift1: 0,
                                        shift2: 0,
                                    }
                                })
                            } else {
                                updateOptions({
                                    hueShift: 0
                                })
                            }
                        }}
                    />
                    <FieldLabel>Использовать продвинутые настройки</FieldLabel>
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
        </PaletteOptionsFormRoot>
    )
}

const PaletteOptionsFormRoot = styled(Form)()

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
