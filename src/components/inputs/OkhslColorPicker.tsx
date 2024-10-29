import styled from '@emotion/styled'
import { ColorRangeInput } from '..'
import { Okhsl, okhsl } from 'culori'
import { useControllableState } from '../hooks'

export type OkhslColorPickerProps = {
    value?: Okhsl
    onChange?(color: Okhsl): void
}

export const OkhslColorPicker = (props: OkhslColorPickerProps) => {
    const { value: valueProp, onChange } = props
    const [value, setValue] = useControllableState<Okhsl>({
        defaultProp: okhsl('#d03531'),
        prop: valueProp,
        onChange,
    })
    return (
        <OkhslColorPickerRoot>
            <ColorRangeInput<Okhsl>
                value={value}
                onChange={setValue}
                channel="h"
                step={1}
            />
            <ColorRangeInput<Okhsl>
                value={value}
                onChange={setValue}
                channel="s"
            />
            <ColorRangeInput<Okhsl>
                value={value}
                onChange={setValue}
                channel="l"
            />
        </OkhslColorPickerRoot>
    )
}

const OkhslColorPickerRoot = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '12px',
    })
)
