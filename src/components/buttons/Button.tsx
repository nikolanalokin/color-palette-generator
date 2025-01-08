import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { baseStyles, resetStyles } from './shared'
import { css } from '@emotion/react'

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

export const buttonStyles = css(
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

        '&:disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'none',
        }
    }
)

const ButtonRoot = styled.button(
    resetStyles,
    buttonStyles,
)
