import styled from '@emotion/styled'
import { ColorRangeInput } from '..'
import { Oklch, oklch } from 'culori'
import { useControllableState } from '../hooks'

export type OklchColorPickerProps = {
    value?: Oklch
    onChange?(color: Oklch): void
}

export const OklchColorPicker = (props: OklchColorPickerProps) => {
    const { value: valueProp, onChange } = props
    const [value, setValue] = useControllableState<Oklch>({
        defaultProp: oklch('#d03531'),
        prop: valueProp,
        onChange,
    })
    return (
        <OklchColorPickerRoot>
            <ColorRangeInput<Oklch>
                value={value}
                onChange={setValue}
                channel="l"
            />
            <ColorRangeInput<Oklch>
                value={value}
                onChange={setValue}
                channel="c"
            />
            <ColorRangeInput<Oklch>
                value={value}
                onChange={setValue}
                channel="h"
            />
        </OklchColorPickerRoot>
    )
}

const OklchColorPickerRoot = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '12px',
    })
)
