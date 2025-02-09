import { getDefaultOkhslHueShiftRotateProcessorValue, OkhslHueShiftRotateProcessorOptions } from '../../astral'
import { useControllableState } from '../hooks'
import { FormFieldsRow, FormGroup, NumberInput } from '../inputs'

export type OkhslHueShiftRotateProcessorFormProps = {
    value?: OkhslHueShiftRotateProcessorOptions
    onChange?(value: OkhslHueShiftRotateProcessorOptions): void
}

export const OkhslHueShiftRotateProcessorForm: React.FC<OkhslHueShiftRotateProcessorFormProps> = props => {
    const {
        value: valueProp,
        onChange,
    } = props

    const [value, setValue] = useControllableState({
        defaultProp: getDefaultOkhslHueShiftRotateProcessorValue(),
        prop: valueProp,
        onChange,
    })

    return (
        <FormGroup labelText="Hue rotate">
            <FormFieldsRow>
                <NumberInput
                    labelText="Point 1"
                    value={value.point1}
                    onValueChange={v => setValue({ ...value, point1: v })}
                    min={0}
                    max={360}
                    step={1}
                />

                <NumberInput
                    labelText="Value 1"
                    value={value.value1}
                    onValueChange={v => setValue({ ...value, value1: v })}
                    step={1}
                />
            </FormFieldsRow>

            <FormFieldsRow>
                <NumberInput
                    labelText="Point 2"
                    value={value.point2}
                    onValueChange={v => setValue({ ...value, point2: v })}
                    min={0}
                    max={360}
                    step={1}
                />

                <NumberInput
                    labelText="Value 2"
                    value={value.value2}
                    onValueChange={v => setValue({ ...value, value2: v })}
                    step={1}
                />
            </FormFieldsRow>
        </FormGroup>
    )
}
