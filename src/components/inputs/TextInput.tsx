import styled from '@emotion/styled'
import { BaseInput, Field, FieldLabel } from './shared'
import { useId } from 'react'

type BaseTextInputProps = {
    labelText?: string
    value?: string
    onChange?(value: string): void
}

export type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseTextInputProps> & BaseTextInputProps

export const TextInput = (props: TextInputProps) => {
    const {
        labelText,
        id: idProp,
        value,
        onChange,
        ...restProps
    } = props
    const id = idProp || useId()
    return (
        <TextInputRoot>
            { labelText ? (
                <FieldLabel htmlFor={id}>
                    { labelText }
                </FieldLabel>
            ) : null }

            <BaseInput
                id={id}
                type="text"
                value={value}
                onChange={evt => onChange?.(evt.target.value)}
                {...restProps}
            />
        </TextInputRoot>
    )
}

const TextInputRoot = styled(Field)(
    () => ({

    })
)
