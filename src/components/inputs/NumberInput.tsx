import styled from '@emotion/styled'
import { BaseInput, Field, Label } from './shared'

type BaseNumberInputProps = {
    labelText?: string
    value?: number
    onChange?(value: number): void
}

export type NumberInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseNumberInputProps> & BaseNumberInputProps

export const NumberInput = (props: NumberInputProps) => {
    const {
        labelText,
        id,
        defaultValue = '',
        value,
        onChange,
        ...restProps
    } = props

    return (
        <NumberInputRoot>
            { labelText ? (
                <Label htmlFor={id}>
                    { labelText }
                </Label>
            ) : null }

            <BaseInput
                id={id}
                type="number"
                value={typeof value === 'number' ? value.toString() : ''}
                onChange={evt => onChange?.(evt.target.value ? parseFloat(evt.target.value) : null)}
                {...restProps}
            />
        </NumberInputRoot>
    )
}

const NumberInputRoot = styled(Field)(
    () => ({

    })
)
