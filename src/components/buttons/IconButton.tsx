import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { baseStyles, resetStyles } from './shared'

type BaseIconButtonProps = {}

export type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseIconButtonProps> & BaseIconButtonProps

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (props, forwardedRef) => {
        const {
            children,
            ...restProps
        } = props

        return (
            <IconButtonRoot ref={forwardedRef} {...restProps}>
                { children }
            </IconButtonRoot>
        )
    }
)

const IconButtonRoot = styled.button(
    resetStyles,
    baseStyles,
    {
        paddingBlock: '8px',
        paddingInline: '8px',
        lineHeight: '1.25rem',
    }
)
