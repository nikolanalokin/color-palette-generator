import styled from '@emotion/styled'
import { FieldLabel } from './shared'
import { useId } from 'react'

type BaseCheckboxProps = {
    labelText?: string
    checked?: boolean
    onChange?(checked: boolean): void
}

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseCheckboxProps> & BaseCheckboxProps

export const Checkbox = (props: CheckboxProps) => {
    const {
        labelText,
        id: idProp,
        checked,
        onChange,
        ...restProps
    } = props
    const id = idProp || useId()
    return (
        <CheckboxRoot>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={evt => onChange?.(evt.target.checked)}
                {...restProps}
            />

            { labelText ? (
                <FieldLabel htmlFor={id}>
                    { labelText }
                </FieldLabel>
            ) : null }
        </CheckboxRoot>
    )
}

const CheckboxRoot = styled.div(
    ({}) => ({
        display: 'flex',
        columnGap: '8px',
    })
)
