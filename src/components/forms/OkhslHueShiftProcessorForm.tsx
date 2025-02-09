import { getDefaultOkhslHueShiftProcessorValue, OkhslHueShiftProcessorOptions } from '../../astral'
import { useControllableState } from '../hooks'
import { FormGroup, NumberInput } from '../inputs'

export type OkhslHueShiftProcessorFormProps = {
    value?: OkhslHueShiftProcessorOptions
    onChange?(value: OkhslHueShiftProcessorOptions): void
}

export const OkhslHueShiftProcessorForm: React.FC<OkhslHueShiftProcessorFormProps> = props => {
    const {
        value: valueProp,
        onChange,
    } = props

    const [value, setValue] = useControllableState({
        defaultProp: getDefaultOkhslHueShiftProcessorValue(),
        prop: valueProp,
        onChange,
    })

    return (
        <FormGroup labelText="Hue linear">
            <NumberInput
                labelText="Value"
                value={value.value}
                onValueChange={v => setValue({ ...value, value: v })}
                min={0}
                max={360}
                step={1}
            />

            <NumberInput
                labelText="Zero point on scale"
                value={value.scaleZero}
                onValueChange={v => setValue({ ...value, scaleZero: v })}
                min={0}
                max={1}
                step={0.01}
            />
        </FormGroup>
    )
}
