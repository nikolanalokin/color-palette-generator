import { getDefaultOkhslLightnessBezierProcessorValue, OkhslLightnessBezierProcessorOptions } from '../../core_v2'
import { useControllableState } from '../hooks'
import { FormFieldsRow, FormGroup, NumberInput } from '../inputs'

export type OkhslLightnessBezierProcessorFormProps = {
    value?: OkhslLightnessBezierProcessorOptions
    onChange?(value: OkhslLightnessBezierProcessorOptions): void
}

export const OkhslLightnessBezierProcessorForm: React.FC<OkhslLightnessBezierProcessorFormProps> = props => {
    const {
        value: valueProp,
        onChange,
    } = props

    const [value, setValue] = useControllableState({
        defaultProp: getDefaultOkhslLightnessBezierProcessorValue(),
        prop: valueProp,
        onChange,
    })

    return (
        <FormGroup labelText="Lightness bezier">
            <FormFieldsRow>
                <NumberInput
                    labelText="Point 1 x"
                    value={value.p0[0]}
                    onValueChange={v => setValue({ ...value, p0: [v, value.p0[1]] })}
                    min={0}
                    max={1}
                    step={0.01}
                />

                <NumberInput
                    labelText="Point 1 y"
                    value={value.p0[1]}
                    onValueChange={v => setValue({ ...value, p0: [value.p0[0], v] })}
                    min={0}
                    max={1}
                    step={0.01}
                />
            </FormFieldsRow>

            <FormFieldsRow>
                <NumberInput
                    labelText="Point 2 x"
                    value={value.p1[0]}
                    onValueChange={v => setValue({ ...value, p1: [v, value.p1[1]] })}
                    min={0}
                    max={1}
                    step={0.01}
                />

                <NumberInput
                    labelText="Point 2 y"
                    value={value.p1[1]}
                    onValueChange={v => setValue({ ...value, p1: [value.p1[0], v] })}
                    min={0}
                    max={1}
                    step={0.01}
                />
            </FormFieldsRow>

            <FormFieldsRow>
                <NumberInput
                    labelText="Point 3 x"
                    value={value.p2[0]}
                    onValueChange={v => setValue({ ...value, p2: [v, value.p2[1]] })}
                    min={0}
                    max={1}
                    step={0.01}
                />

                <NumberInput
                    labelText="Point 3 y"
                    value={value.p2[1]}
                    onValueChange={v => setValue({ ...value, p2: [value.p2[0], v] })}
                    min={0}
                    max={1}
                    step={0.01}
                />
            </FormFieldsRow>
        </FormGroup>
    )
}
