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
        paddingBlock: '8px',
        paddingInline: '16px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '8px',

        'svg': {
            width: '1.25rem',
            height: '1.25rem',
        },
    }
)
