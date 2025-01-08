import { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { formatHex, okhsl, Okhsl } from 'culori'
import {
    OkhslColorPicker,
    Form,
} from '../../components'
import { TextInput } from '../../components/inputs/TextInput'

export type ColorFormProps = {
    color?: Okhsl
    onColorChange?(value: Okhsl): void
}

export const ColorForm = (props: ColorFormProps) => {
    const {
        color,
        onColorChange,
    } = props
    const hex = useMemo(() => formatHex(color), [color])
    const [hexString, setHexString] = useState(hex)
    useEffect(() => {
        setHexString(hex)
    }, [hex])
    const handleHexColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => onColorChange?.(okhsl(evt.target.value))
    const handleHexStringChange = (value: string) => {
        setHexString(value)
        const valueOkhsl = okhsl(value)
        if (valueOkhsl) onColorChange?.(valueOkhsl)
    }
    return (
        <ColorFormRoot>
            <ColorRectContainer>
                <ColorRect
                    type="color"
                    value={hex}
                    onChange={handleHexColorChange}
                />
            </ColorRectContainer>

            <TextInput
                id="hex"
                value={hexString}
                onChange={handleHexStringChange}
            />

            <OkhslColorPicker
                value={color}
                onChange={value => onColorChange?.(value)}
            />
        </ColorFormRoot>
    )
}

const ColorFormRoot = styled(Form)()

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
