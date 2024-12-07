import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { baseStyles, resetStyles } from './shared'

type BaseButtonProps = {
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
}

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & BaseButtonProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, forwardedRef) => {
        const {
            startIcon,
            endIcon,
            children,
            ...restProps
        } = props

        return (
            <ButtonRoot ref={forwardedRef} {...restProps}>
                { startIcon }
                { children }
                { endIcon }
            </ButtonRoot>
        )
    }
)

const ButtonRoot = styled.button(
    resetStyles,
    baseStyles,
    {
        height: '40px',
        paddingInline: '12px',
        lineHeight: '1.25rem',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '8px',
        transition: 'all .2s',
        backgroundColor: 'rgba(0 0 0 / .1)',
        '&:hover': {
            backgroundColor: 'rgba(0 0 0 / .15)',
        },
        '&:active': {
            backgroundColor: 'rgba(0 0 0 / .2)',
        },
    }
)
