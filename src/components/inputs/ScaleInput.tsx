import styled from '@emotion/styled'
import { Field, FieldLabel } from './shared'
import { NumberInput } from './NumberInput'
import { useControllableState } from '../hooks'
import { useEffect, useState } from 'react'

type BaseScaleInputProps = {
    labelText?: string
    value?: number[]
    onValueChange?(value: number[]): void
}

export type ScaleInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseScaleInputProps> & BaseScaleInputProps

export const ScaleInput = (props: ScaleInputProps) => {
    const {
        labelText,
        id: idProp,
        value: valueProp,
        onValueChange,
        ...restProps
    } = props

    const [value, setValue] = useControllableState({
        defaultProp: [],
        prop: valueProp,
        onChange: onValueChange,
    })

    const [from, setFrom] = useState(fromValue(value).from)
    const [to, setTo] = useState(fromValue(value).to)
    const [parts, setParts] = useState(fromValue(value).parts)

    useEffect(() => {
        if (!value.length) {
            update()
        }
    }, [])

    const update = () => {
        if (
            typeof from === 'number' && typeof to === 'number' && typeof parts === 'number' &&
            to > from &&
            parts > 1
        ) {
            const newValue = toValue(from, to, parts)
            setValue(newValue)
        }
    }

    const handleFromChange = (value: number) => {
        setFrom(value)
        update()
    }

    const handleToChange = (value: number) => {
        setTo(value)
        update()
    }

    const handlePartsChange = (value: number) => {
        setParts(value)
        update()
    }

    return (
        <ScaleInputRoot {...restProps}>
            { labelText ? (
                <ScaleInputLabel >
                    { labelText }
                </ScaleInputLabel>
            ) : null }

            <ScaleInputInput>
                <NumberInput
                    labelText="От"
                    value={from}
                    onValueChange={handleFromChange}
                />
                <NumberInput
                    labelText="До"
                    value={to}
                    onValueChange={handleToChange}
                />
                <NumberInput
                    labelText="Частей"
                    value={parts}
                    onValueChange={handlePartsChange}
                />
            </ScaleInputInput>

            <ScaleInputResult>
                Результат: { value.join(', ') }
            </ScaleInputResult>
        </ScaleInputRoot>
    )
}

const ScaleInputRoot = styled(Field)(
    () => ({

    })
)

const ScaleInputLabel = styled(FieldLabel)(
    () => ({
        display: 'flex',
        justifyContent: 'space-between',
    })
)

const ScaleInputInput = styled.div(
    () => ({
        display: 'flex',
        columnGap: '8px',
    })
)

const ScaleInputResult = styled.div(
    () => ({
        fontSize: '0.75rem',
        color: 'rgba(0 0 0 / .6)',
    })
)

function toValue (from: number, to: number, parts: number) {
    const step = (to - from) / parts
    return [...new Array(parts)].map((_, i) => i * step).concat(to)
}

function fromValue (value: number[]) {
    if (!value.length) {
        return {
            from: 0,
            to: 1000,
            parts: 10,
        }
    }
    return {
        from: value.at(0),
        to: value.at(-1),
        parts: value.length - 1,
    }
}
