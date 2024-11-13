import styled from '@emotion/styled'
import { Label } from './shared'

type BaseCheckboxProps = {
    labelText?: string
    checked?: boolean
    onChange?(checked: boolean): void
}

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseCheckboxProps> & BaseCheckboxProps

export const Checkbox = (props: CheckboxProps) => {
    const {
        labelText,
        id,
        checked,
        onChange,
        ...restProps
    } = props

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
                <Label htmlFor={id}>
                    { labelText }
                </Label>
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
