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
            htmlFor={id}
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

const SwitchRoot = styled.label(
    ({}) => ({
        position: 'relative',
        backgroundColor: 'rgba(0 0 0 / .1)',
        borderRadius: '12px',
        height: '24px',
        width: '48px',

        '&:focus': {
            outline: '2px solid black',
        },

        '&::after': {
            boxSizing: 'border-box',
            content: '""',
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
        position: 'absolute',
        overflow: 'hidden',
        padding: '0',
        border: '0',
        margin: '-1px',
        blockSize: '1px',
        clip: 'rect(0, 0, 0, 0)',
        inlineSize: '1px',
        visibility: 'inherit',
        whiteSpace: 'nowrap',
    })
)
