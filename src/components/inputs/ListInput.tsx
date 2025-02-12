import styled from '@emotion/styled'
import { Field, FieldLabel } from './shared'
import { useControllableState } from '../hooks'
import { useEffect, useState } from 'react'
import { Textarea } from './Textarea'

type BaseListInputProps = {
    labelText?: string
    value?: string[]
    onValueChange?(value: string[]): void
}

export type ListInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseListInputProps> & BaseListInputProps

export const ListInput = (props: ListInputProps) => {
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

    const [valueString, setValueString] = useState(value.join(',\n'))

    useEffect(() => {
        const parsed = split(valueString)
        if (value.length !== parsed.length || value.some((v, i) => parsed[i] !== v)) {
            setValueString(value.join(',\n'))
        }
    }, [value])

    const handleChange = (value: string) => {
        setValueString(value)
        const newValue = split(value)
        setValue(newValue)
    }

    return (
        <ListInputRoot {...restProps}>
            { labelText ? (
                <ListInputLabel >
                    { labelText }
                </ListInputLabel>
            ) : null }

            <ListInputInput>
                <Textarea
                    value={valueString}
                    onValueChange={handleChange}
                />
            </ListInputInput>

            <ListInputResult>
                Результат: { value.join(', ') }
            </ListInputResult>
        </ListInputRoot>
    )
}

const ListInputRoot = styled(Field)(
    () => ({

    })
)

const ListInputLabel = styled(FieldLabel)(
    () => ({
        display: 'flex',
        justifyContent: 'space-between',
    })
)

const ListInputInput = styled.div(
    () => ({
        display: 'flex',
        columnGap: '8px',
    })
)

const ListInputResult = styled.div(
    ({}) => ({
        fontSize: '0.75rem',
        color: 'rgba(0 0 0 / .6)',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
    })
)

function split (value: string) {
    return value.trim().split(/[,\n]/).map(item => item.replace('\s', '')).filter(Boolean)
}
