import styled from '@emotion/styled'
import { ColorRangeInput } from '..'
import { Color, getMode, Rgb } from 'culori'
import { useControllableState } from '../hooks'
import { useMemo } from 'react'

export type ChannelColorPickerProps<C extends Color> = {
    value?: C
    onChange?(color: C): void
}

export function ChannelColorPicker<C extends Color = Rgb>(props: ChannelColorPickerProps<C>) {
    const { value: valueProp, onChange } = props
    const [value, setValue] = useControllableState<C>({
        defaultProp: null,
        prop: valueProp,
        onChange,
    })
    const definition = useMemo(() => getMode(value?.mode ?? 'rgb'), [value?.mode])
    return (
        <ChannelColorPickerRoot>
            { definition.channels.map(channel => (
                <ColorRangeInput
                    key={channel}
                    channel={channel}
                    value={value}
                    onChange={setValue}
                />
            )) }
        </ChannelColorPickerRoot>
    )
}

const ChannelColorPickerRoot = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '.5rem',
    })
)
