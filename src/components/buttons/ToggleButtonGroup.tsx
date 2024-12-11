import { createContext, forwardRef, useContext, useMemo } from 'react'
import styled from '@emotion/styled'
import { baseStyles, resetStyles } from './shared'
import { ToggleButtonRoot } from './ToggleButton'

type BaseToggleButtonGroupProps = {
    value?: string
    onChange?(value: string): void
    orientation?: 'horizontal' | 'vertical'
}

export type ToggleButtonGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseToggleButtonGroupProps> & BaseToggleButtonGroupProps

type ToggleButtonGroupContextState = {
    value?: string
    onChange?(selected: boolean, value: string): void
}

const ToggleButtonGroupContext = createContext<ToggleButtonGroupContextState>(null)

export function useToggleButtonGroupContext () {
    return useContext(ToggleButtonGroupContext) as ToggleButtonGroupContextState
}

export const ToggleButtonGroup = forwardRef<HTMLDivElement, ToggleButtonGroupProps>(
    (props, forwardedRef) => {
        const {
            value,
            onChange,
            orientation = 'horizontal',
            children,
            ...restProps
        } = props
        const childContext = useMemo(() => ({
            value,
            onChange(_, value) {
                onChange?.(value)
            }
        }), [value, onChange])
        return (
            <ToggleButtonGroupContext.Provider value={childContext}>
                <ToggleButtonGroupRoot
                    ref={forwardedRef}
                    {...restProps}
                    data-orientation={orientation}
                >
                    { children }
                </ToggleButtonGroupRoot>
            </ToggleButtonGroupContext.Provider>
        )
    }
)

const ToggleButtonGroupRoot = styled.div({
    display: 'flex',

    [`& ${ToggleButtonRoot}`]: {
        borderRadius: 0,
    },

    '&[data-orientation="horizontal"]': {
        [`& ${ToggleButtonRoot}:first-of-type`]: {
            borderStartStartRadius: '6px',
            borderEndStartRadius: '6px',
        },

        [`& ${ToggleButtonRoot}:last-of-type`]: {
            borderStartEndRadius: '6px',
            borderEndEndRadius: '6px',
        },
    },

    '&[data-orientation="vertical"]': {
        flexDirection: 'column',

        [`& ${ToggleButtonRoot}:first-of-type`]: {
            borderStartStartRadius: '6px',
            borderStartEndRadius: '6px',
        },

        [`& ${ToggleButtonRoot}:last-of-type`]: {
            borderEndStartRadius: '6px',
            borderEndEndRadius: '6px',
        },
    },
})
