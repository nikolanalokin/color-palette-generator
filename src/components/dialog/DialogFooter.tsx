import styled from '@emotion/styled'

type BaseDialogFooterProps = {}

export type DialogFooterProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseDialogFooterProps> & BaseDialogFooterProps

export const DialogFooter = (props: DialogFooterProps) => {
    const {
        children,
        ...restProps
    } = props

    return (
        <DialogFooterRoot {...restProps}>
            { children }
        </DialogFooterRoot>
    )
}

const DialogFooterRoot = styled.div({
    paddingBlockEnd: '24px',
    paddingInline: '36px',
})
