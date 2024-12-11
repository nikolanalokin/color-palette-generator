import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { baseStyles, resetStyles } from './shared'
import { useToggleButtonGroupContext } from './ToggleButtonGroup'

type BaseToggleButtonProps = {
    selected?: boolean
    value?: string
    onSelect?(selected: boolean, value: string): void
}

export type ToggleButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseToggleButtonProps> & BaseToggleButtonProps

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
    (props, forwardedRef) => {
        const {
            selected: selectedProp,
            value,
            onSelect,
            onClick,
            children,
            ...restProps
        } = props
        const groupContext = useToggleButtonGroupContext()
        const selected = groupContext?.value === value || selectedProp
        return (
            <ToggleButtonRoot
                ref={forwardedRef}
                onClick={evt => {
                    groupContext?.onChange(!selected, value)
                    onSelect?.(!selected, value)
                    onClick?.(evt)
                }}
                {...restProps}
                data-selected={selected}
            >
                { children }
            </ToggleButtonRoot>
        )
    }
)

export const ToggleButtonRoot = styled.button(
    resetStyles,
    baseStyles,
    {
        paddingBlock: '8px',
        paddingInline: '8px',

        '&[data-selected="true"]': {
            backgroundColor: 'rgba(0 0 0 / .1)',

            '&:hover': {
                backgroundColor: 'rgba(0 0 0 / .15)',
            },

            '&:active': {
                backgroundColor: 'rgba(0 0 0 / .2)',
            },
        },

        'svg': {
            width: '1.25rem',
            height: '1.25rem',
        }
    }
)
