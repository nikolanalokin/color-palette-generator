import { getDefaultOkhslLightnessLinearProcessorValue, OkhslLightnessLinearProcessorOptions } from '../../astral'
import { useControllableState } from '../hooks'
import { FormGroup } from '../inputs'

export type OkhslLightnessLinearProcessorFormProps = {
    value?: OkhslLightnessLinearProcessorOptions
    onChange?(value: OkhslLightnessLinearProcessorOptions): void
}

export const OkhslLightnessLinearProcessorForm: React.FC<OkhslLightnessLinearProcessorFormProps> = props => {
    const {
        value: valueProp,
        onChange,
    } = props

    const [value, setValue] = useControllableState({
        defaultProp: getDefaultOkhslLightnessLinearProcessorValue(),
        prop: valueProp,
        onChange,
    })

    return (
        <FormGroup labelText="Lightness linear">
            Нет настроек
        </FormGroup>
    )
}
