import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { baseStyles, resetStyles } from './shared'
import { css } from '@emotion/react'

type BaseIconButtonProps = {
    variant?: 'blur'
    size?: 'sm' | 'md'
}

export type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseIconButtonProps> & BaseIconButtonProps

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (props, forwardedRef) => {
        const {
            variant,
            size = 'md',
            children,
            ...restProps
        } = props

        return (
            <IconButtonRoot
                ref={forwardedRef}
                {...restProps}
                data-variant={variant}
                data-size={size}
            >
                { children }
            </IconButtonRoot>
        )
    }
)

export const iconButtonStyles = css(
    baseStyles,
    {
        paddingBlock: '8px',
        paddingInline: '8px',

        'svg': {
            width: '1.25rem',
            height: '1.25rem',
        },

        '&[data-size="sm"]': {
            borderRadius: '4px',

            paddingBlock: '4px',
            paddingInline: '4px',

            'svg': {
                width: '1rem',
                height: '1rem',
            },
        },

        '&[data-variant="blur"]': {
            backgroundColor: 'rgba(255 255 255 / 0.5)',
            border: '1px solid rgba(255 255 255 / 0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0 0 0 / 0.1)',

            '&:hover': {
                backgroundColor: 'rgba(255 255 255 / 0.3)',
            },

            '&:active': {
                backgroundColor: 'rgba(255 255 255 / 0.1)',
            },
        },
    }
)

const IconButtonRoot = styled.button(
    resetStyles,
    iconButtonStyles,
)
