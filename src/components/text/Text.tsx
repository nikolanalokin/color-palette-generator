import styled from '@emotion/styled'
import { pxToRem } from '../utils'

type BaseTextProps = {
    variant?:
        | 'heading1'
        | 'heading2'
        | 'body1'
        | 'body2'
        | 'caption'
        | 'inherit'
    color?:
        | 'primary'
        | 'secondary'
}

export type TextProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseTextProps> & BaseTextProps

export const Text: React.FC<TextProps> = props => {
    const {
        variant = 'inherit',
        color = 'inherit',
        children,
        ...restProps
    } = props

    return (
        <TextRoot
            data-variant={variant}
            data-color={color}
            {...restProps}
        >
            { children }
        </TextRoot>
    )
}

const TextRoot = styled.div({
    '&[data-variant="heading1"]': {
        fontSize: pxToRem(48),
        lineHeight: pxToRem(56),
    },

    '&[data-variant="heading2"]': {
        fontSize: pxToRem(24),
        lineHeight: pxToRem(32),
    },

    '&[data-variant="body1"]': {
        fontSize: pxToRem(16),
        lineHeight: pxToRem(20),
    },

    '&[data-variant="body2"]': {
        fontSize: pxToRem(14),
        lineHeight: pxToRem(16),
    },

    '&[data-variant="caption"]': {
        fontSize: pxToRem(12),
        lineHeight: pxToRem(16),
    },

    '&[data-color="primary"]': {
        color: 'var(--color-text-primary)',
    },

    '&[data-color="secondary"]': {
        color: 'var(--color-text-secondary)',
    },
})
