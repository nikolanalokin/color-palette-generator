import styled from '@emotion/styled'
import { forwardRef } from 'react'

type BaseDialogProps = {}

export type DialogProps = Omit<React.DialogHTMLAttributes<HTMLDialogElement>, keyof BaseDialogProps> & BaseDialogProps

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
    (props, forwardedRef) => {
        const {
            children,
            ...restProps
        } = props

        return (
            <DialogRoot ref={forwardedRef} {...restProps}>
                { children }
            </DialogRoot>
        )
    }
)

const DialogRoot = styled.dialog({
    padding: 0,
    border: 0,
}, {
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    overflow: 'hidden',

    '&[open]': {
        display: 'flex',
        flexDirection: 'column',
    },

    '&::backdrop': {
        backdropFilter: 'blur(2px)',
        backgroundColor: 'rgba(0 0 0 / 0.2)',
    }
})
