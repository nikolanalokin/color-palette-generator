import styled from '@emotion/styled'
import { FieldLabel } from './shared'
import { useId } from 'react'
import { CheckIcon } from 'lucide-react'
import { useControllableState } from '../hooks'

type BaseCheckboxProps = {
    labelText?: string
    checked?: boolean
    onValueChange?(checked: boolean): void
}

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseCheckboxProps> & BaseCheckboxProps

export const Checkbox = (props: CheckboxProps) => {
    const {
        labelText,
        id: idProp,
        defaultChecked = false,
        checked,
        onValueChange,
        ...restProps
    } = props
    const id = idProp || useId()
    const [value, setValue] = useControllableState({
        defaultProp: defaultChecked,
        prop: checked,
        onChange: onValueChange,
    })
    return (
        <CheckboxRoot htmlFor={id}>
            <CheckboxInput
                id={id}
                type="checkbox"
                checked={value}
                onChange={evt => setValue(evt.target.checked)}
                {...restProps}
            />

            <CheckboxCheckIcon />

            { labelText ? (
                <CheckboxLabel>
                    { labelText }
                </CheckboxLabel>
            ) : null }
        </CheckboxRoot>
    )
}

const CheckboxRoot = styled.label(
    ({}) => ({
        position: 'relative',
        display: 'flex',
        columnGap: '8px',
    })
)

const CheckboxInput = styled.input(
    ({}) => ({
        appearance: 'none',
        margin: 0,
        border: 0,
        padding: 0,
        outlineOffset: 0,
        inset: 0,
        // borderRadius: 'inherit',
        cursor: 'pointer',

        width: '24px',
        height: '24px',

        backgroundColor: 'rgba(0 0 0 / .1)',
        borderRadius: '4px',

        transition: 'background-color .2s',

        '&:hover': {
            backgroundColor: 'rgba(0 0 0 / .15)',
        },

        '&:active': {
            backgroundColor: 'rgba(0 0 0 / .2)',
        },

        '&:checked': {
            [`& + ${CheckboxCheckIcon}`]: {
                opacity: 1,
            }
        },

        '&:focus': {
            outline: '2px solid black',
        },
    })
)

const CheckboxCheckIcon = styled(CheckIcon)({
    opacity: 0,
    position: 'absolute',
    insetBlockStart: '2px',
    insetInlineStart: '2px',
    width: '20px',
    height: '20px',
    transition: 'opacity .2s',
    pointerEvents: 'none',
})

const CheckboxLabel = styled.span(
    ({}) => ({
        fontSize: '0.875rem',
    })
)
