import styled from '@emotion/styled'
import { BaseInput, Field, Label } from './shared'

type BaseTextInputProps = {
    labelText?: string
    value?: string
    onChange?(value: string): void
}

export type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseTextInputProps> & BaseTextInputProps

export const TextInput = (props: TextInputProps) => {
    const {
        labelText,
        id,
        value,
        onChange,
        ...restProps
    } = props

    return (
        <TextInputRoot>
            { labelText ? (
                <Label htmlFor={id}>
                    { labelText }
                </Label>
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
