import { getDefaultOkhslLightnessQuadProcessorValue, OkhslLightnessQuadProcessorOptions } from '../../astral'
import { useControllableState } from '../hooks'
import { Checkbox, FormGroup } from '../inputs'

export type OkhslLightnessQuadProcessorFormProps = {
    value?: OkhslLightnessQuadProcessorOptions
    onChange?(value: OkhslLightnessQuadProcessorOptions): void
}

export const OkhslLightnessQuadProcessorForm: React.FC<OkhslLightnessQuadProcessorFormProps> = props => {
    const {
        value: valueProp,
        onChange,
    } = props

    const [value, setValue] = useControllableState({
        defaultProp: getDefaultOkhslLightnessQuadProcessorValue(),
        prop: valueProp,
        onChange,
    })

    return (
        <FormGroup labelText="Lightness quad">
            <Checkbox
                labelText="Inverse"
                checked={value.inverse}
                onValueChange={checked => setValue({ inverse: checked })}
            />
        </FormGroup>
    )
}
