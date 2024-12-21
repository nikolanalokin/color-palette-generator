import { useId } from 'react'
import styled from '@emotion/styled'
import { useControllableState } from '../hooks'

type BaseSwitchProps = {
    onValueChange?(checked: boolean): void
}

export type SwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseSwitchProps> & BaseSwitchProps

export const Switch: React.FC<SwitchProps> = (props) => {
    const {
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
        <SwitchRoot
            data-checked={value}
        >
            <SwitchInput
                id={id}
                type="checkbox"
                checked={value}
                onChange={evt => setValue(evt.target.checked)}
                {...restProps}
            />
        </SwitchRoot>
    )
}

const SwitchRoot = styled.div(
    ({}) => ({
        position: 'relative',
        backgroundColor: 'rgba(0 0 0 / .1)',
        borderRadius: '12px',
        height: '24px',
        width: '48px',

        '&::after': {
            boxSizing: 'border-box',
            content: '""',
            zIndex: -1,
            position: 'absolute',
            insetBlockStart: '2px',
            insetInlineStart: '2px',
            borderRadius: '50%',
            // border: '2px solid',
            borderColor: 'rgba(0 0 0 / .2)',
            backgroundColor: 'rgba(0 0 0 / .2)',
            width: '20px',
            height: '20px',
            transition: 'translate .2s, border-color .2s, background-color .2s',
        },

        '&[data-checked="true"]': {
            '&::after': {
                translate: '24px',
                borderColor: 'rgb(0 0 0)',
                backgroundColor: 'rgb(0 0 0)',
            },
        },
    })
)

const SwitchInput = styled.input(
    ({}) => ({
        appearance: 'none',
        margin: 0,
        border: 0,
        padding: 0,
        outlineOffset: 0,
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        cursor: 'pointer',

        '&:focus': {
            outline: '2px solid black',
        },
    })
)
