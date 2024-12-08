import styled from '@emotion/styled'

type BaseDialogContentProps = {}

export type DialogContentProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseDialogContentProps> & BaseDialogContentProps

export const DialogContent = (props: DialogContentProps) => {
    const {
        children,
        ...restProps
    } = props

    return (
        <DialogContentRoot {...restProps}>
            { children }
        </DialogContentRoot>
    )
}

const DialogContentRoot = styled.div({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
})
