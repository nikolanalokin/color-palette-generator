import { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { Color, formatHex, getMode, Mode, okhsl, Okhsl, useMode } from 'culori'
import { FormGroup } from './shared'
import { TextInput } from './TextInput'
import { OkhslColorPicker } from './OkhslColorPicker'
import { useControllableState } from '../hooks'

export type ColorPickerProps = {
    mode?: Mode
    value?: string | Color
    onValueChange?(value: string | Color): void
}

export const ColorPicker: React.FC<ColorPickerProps> = props => {
    const {
        mode,
        value: valueProp,
        onValueChange,
    } = props

    const [value, setValue] = useControllableState({
        defaultProp: DEFAULT_COLOR,
        prop: valueProp,
        onChange: onValueChange,
    })

    const isHexMode = !mode

    const converter = useMemo(() => isHexMode ? (v: string) => v : useMode(getMode(mode)), [mode, isHexMode])

    const hexValue = useMemo(() => isHexMode ? value as string : formatHex(value), [value, isHexMode])
    const inModeValue = useMemo(() => isHexMode ? converter(value as string) : value as Color, [value, isHexMode, converter])

    const [hexString, setHexString] = useState(hexValue)

    useEffect(() => {
        setHexString(hexValue)
    }, [hexValue])

    const handleHexColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = isHexMode ? evt.target.value : converter(evt.target.value)
        setValue?.(newValue)
    }

    const handleHexStringChange = (value: string) => {
        setHexString(value)

        if (/^#?([a-f0-9]{6}|[a-f0-9]{3})$/.test(value)) {
            const newValue = isHexMode ? value : converter(value)
            setValue?.(newValue)
        }
    }

    const handleOkhslChange = (value: Okhsl) => {
        const newValue = isHexMode ? formatHex(value) : value
        setValue?.(newValue)
    }

    return (
        <FormGroup>
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

            <OkhslColorPicker
                value={okhsl(inModeValue)}
                onChange={handleOkhslChange}
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
