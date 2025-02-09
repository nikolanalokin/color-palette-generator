import { getDefaultOkhslSaturationProcessorValue, OkhslSaturationProcessorOptions } from '../../astral'
import { useControllableState } from '../hooks'
import { FormGroup, NumberInput } from '../inputs'

export type OkhslSaturationProcessorFormProps = {
    value?: OkhslSaturationProcessorOptions
    onChange?(value: OkhslSaturationProcessorOptions): void
}

export const OkhslSaturationProcessorForm: React.FC<OkhslSaturationProcessorFormProps> = props => {
    const {
        value: valueProp,
        onChange,
    } = props

    const [value, setValue] = useControllableState({
        defaultProp: getDefaultOkhslSaturationProcessorValue(),
        prop: valueProp,
        onChange,
    })

    return (
        <FormGroup labelText="Saturation parabola">
            <NumberInput
                labelText="Value"
                value={value.value}
                onValueChange={v => setValue({ ...value, value: v })}
                min={0}
                max={1}
                step={0.01}
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
