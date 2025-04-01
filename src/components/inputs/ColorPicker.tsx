import { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { Color, formatHex, getMode, Mode, okhsl, Okhsl, useMode } from 'culori'
import { FormGroup } from './shared'
import { TextInput } from './TextInput'
import { useControllableState, useLatest } from '../hooks'
import { FindColorByMode } from 'culori/src/common'
import { ChannelColorPicker } from './ChannelColorPicker'

export type ColorPickerProps<M extends Mode, C = FindColorByMode<M>> = React.HTMLAttributes<HTMLDivElement> & {
    mode?: M
    value?: C
    onValueChange?(value: C): void
}

export function ColorPicker<M extends Mode = 'rgb', C = FindColorByMode<M>>(props: ColorPickerProps<M>) {
    const {
        mode = 'rgb',
        value: valueProp,
        onValueChange,
        ...restProps
    } = props

    const prevMode = useLatest(mode)

    const definition = useMemo(() => getMode(mode), [mode])
    const converter = useMemo(() => useMode(definition), [definition])

    const [value, setValue] = useControllableState({
        defaultProp: converter(DEFAULT_COLOR),
        prop: valueProp,
        onChange: onValueChange,
    })

    const [hexString, setHexString] = useState(formatHex(value))

    if (prevMode !== mode) {
        setValue(converter(value))
    }

    const handleHexColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = evt.target.value
        setValue(converter(newValue))
        setHexString(newValue)
    }

    const handleHexStringChange = (newValue: string) => {
        setHexString(newValue)

        if (/^#?([a-f0-9]{6}|[a-f0-9]{3})$/.test(newValue)) {
            setValue(converter(newValue))
        }
    }

    const handleChange = (newValue: C) => {
        setValue(newValue)
        setHexString(formatHex(newValue))
    }

    const hexValue = formatHex(value)

    return (
        <FormGroup {...restProps}>
            <ColorRectContainer>
                <ColorRect
                    type="color"
                    value={hexValue}
                    onChange={handleHexColorChange}
                />
            </ColorRectContainer>

            <TextInput
                id="hex"
                value={hexString}
                onChange={handleHexStringChange}
            />

            <ChannelColorPicker
                value={value}
                onChange={handleChange}
            />
        </FormGroup>
    )
}

const DEFAULT_COLOR = '#240cd4'

const ColorRectContainer = styled.div(
    ({}) => ({
        height: '64px',
    })
)

const ColorRect = styled.input`
    height: 100%;
    width: 100%;
    border-radius: 4px;

    appearance: none;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    &::-webkit-color-swatch {
        border: none;
    }
`
