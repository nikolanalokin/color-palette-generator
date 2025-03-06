import { getDefaultOkhslLightnessCubeProcessorValue, OkhslLightnessCubeProcessorOptions } from '../../astral'
import { useControllableState } from '../hooks'
import { Checkbox, FormGroup } from '../inputs'

export type OkhslLightnessCubeProcessorFormProps = {
    value?: OkhslLightnessCubeProcessorOptions
    onChange?(value: OkhslLightnessCubeProcessorOptions): void
}

export const OkhslLightnessCubeProcessorForm: React.FC<OkhslLightnessCubeProcessorFormProps> = props => {
    const {
        value: valueProp,
        onChange,
    } = props

    const [value, setValue] = useControllableState({
        defaultProp: getDefaultOkhslLightnessCubeProcessorValue(),
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
