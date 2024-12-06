import styled from '@emotion/styled'

type BaseDialogBodyProps = {}

export type DialogBodyProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseDialogBodyProps> & BaseDialogBodyProps

export const DialogBody = (props: DialogBodyProps) => {
    const {
        children,
        ...restProps
    } = props

    return (
        <DialogBodyRoot {...restProps}>
            { children }
        </DialogBodyRoot>
    )
}

const DialogBodyRoot = styled.div({
    paddingBlock: '24px',
    paddingInline: '36px',
})
