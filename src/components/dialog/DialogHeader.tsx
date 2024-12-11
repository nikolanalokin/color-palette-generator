import styled from '@emotion/styled'

type BaseDialogHeaderProps = {}

export type DialogHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseDialogHeaderProps> & BaseDialogHeaderProps

export const DialogHeader = (props: DialogHeaderProps) => {
    const {
        children,
        ...restProps
    } = props

    return (
        <DialogHeaderRoot {...restProps}>
            { children }
        </DialogHeaderRoot>
    )
}

const DialogHeaderRoot = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    paddingBlockStart: '24px',
    paddingInline: '36px',
})
