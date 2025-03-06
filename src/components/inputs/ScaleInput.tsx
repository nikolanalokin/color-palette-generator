import styled from '@emotion/styled'
import { Field, FieldLabel } from './shared'
import { NumberInput } from './NumberInput'
import { useControllableState } from '../hooks'
import { useEffect, useState } from 'react'
import { Slider } from './Slider'
import { IconButton } from '../buttons'
import { PlusIcon } from 'lucide-react'

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

    const [values, setValues] = useControllableState({
        defaultProp: [],
        prop: valueProp,
        onChange: onValueChange,
    })

    const [from, setFrom] = useState(fromValues(values).from)
    const [to, setTo] = useState(fromValues(values).to)
    const [parts, setParts] = useState(fromValues(values).parts)

    useEffect(() => {
        if (!values.length) {
            update()
        }
    }, [])

    const update = () => {
        if (
            typeof from === 'number' && typeof to === 'number' && typeof parts === 'number' &&
            to > from &&
            parts > 1
        ) {
            const newValues = toValues(from, to, parts)
            setValues(newValues)
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

            <ScaleInputSliderContainer>
                <Slider
                    value={values}
                    onValueChange={setValues}
                    min={from}
                    max={to}
                    step={((to - from) / parts) / 4}
                    markText={v => v % 100 === 0}
                    disabledEdge
                />
            </ScaleInputSliderContainer>

            <ScaleInputResult>
                Результат: { values.join(', ') }
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

const ScaleInputSliderContainer = styled.div(
    () => ({
        display: 'flex',
    })
)

const ScaleInputResult = styled.div(
    () => ({
        fontSize: '0.75rem',
        color: 'rgba(0 0 0 / .6)',
    })
)

function toValues (from: number, to: number, parts: number) {
    const step = (to - from) / parts
    return [...new Array(parts)].map((_, i) => i * step).concat(to)
}

function fromValues (values: number[]) {
    if (!values.length) {
        return {
            from: 0,
            to: 1000,
            parts: 10,
        }
    }
    return {
        from: values.at(0),
        to: values.at(-1),
        parts: values.length - 1,
    }
}
