import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { resetStyles } from '../buttons/shared'
import { useTabsContext } from './Tabs'

type BaseTabProps = {
    value?: string
}

export type TabProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseTabProps> & BaseTabProps

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
    (props, forwardedRef) => {
        const {
            value,
            children,
            ...restProps
        } = props
        const context = useTabsContext()
        const selected = value === context.tab
        return (
            <TabRoot
                ref={forwardedRef}
                {...restProps}
                onClick={(evt) => {
                    context.setTab(value)
                    restProps.onClick?.(evt)
                }}
                aria-selected={selected}
                data-selected={selected}
            >
                { children }
            </TabRoot>
        )
    }
)

const TabRoot = styled.button(
    resetStyles,
    {
        position: 'relative',
        fontSize: '1rem',
        lineHeight: '1.25',
        fontWeight: 600,
        paddingBlock: '16px',
        paddingInline: '24px',
        cursor: 'pointer',

        '&:focus': {
            outline: '2px solid black',
        },

        '&:hover': {
            backgroundColor: 'rgba(0 0 0 / .05)',
        },

        '&:active': {
            backgroundColor: 'rgba(0 0 0 / .1)',
        },

        '&[data-selected="true"]': {
            '&::after': {
                content: '""',
                position: 'absolute',
                insetInline: '24px',
                insetBlockEnd: 0,
                height: '2px',
                backgroundColor: 'black',
            }
        },

        '&:first-of-type': {
            borderStartStartRadius: '8px',
            borderEndStartRadius: '8px',
        },

        '&:last-of-type': {
            borderStartEndRadius: '8px',
            borderEndEndRadius: '8px',
        },
    }
)
